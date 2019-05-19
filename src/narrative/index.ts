import * as weightedRandom from 'weighted-random'
import {range, clone} from 'ramda'

import {getRandomValueFromArray} from './lib'

const RES_KEYS = {
    'Medium': 'medium_',
    'MediumQuality': 'medium_quality_',
    'StoryTheme': 'story_theme_'    
}

interface NarrativeSequence {
    units: NarrativeUnit[]
}

enum NARRATIVE_UNIT_TYPE {
    LINEAR_NESTED = 'LINEAR_NESTED',
    LINEAR_UNNESTED = 'LINEAR_UNNESTED',
    LINEAR_PARALLEL = 'LINEAR_PARALLEL',
    LINEAR_SERIAL = 'LINEAR_SERIAL',
    NONLINEAR_FLASHBACK = 'NONLINEAR_FLASHBACK',
    NONLINEAR_FLASHFORWARD = 'NONLINEAR_FLASHFORWARD'
}

const NARRATIVE_UNIT_TYPE_PROBABILITIES = {}
NARRATIVE_UNIT_TYPE_PROBABILITIES[NARRATIVE_UNIT_TYPE.LINEAR_NESTED] = 25
NARRATIVE_UNIT_TYPE_PROBABILITIES[NARRATIVE_UNIT_TYPE.LINEAR_UNNESTED] = 25
NARRATIVE_UNIT_TYPE_PROBABILITIES[NARRATIVE_UNIT_TYPE.LINEAR_PARALLEL] = 10
NARRATIVE_UNIT_TYPE_PROBABILITIES[NARRATIVE_UNIT_TYPE.LINEAR_SERIAL] = 25
NARRATIVE_UNIT_TYPE_PROBABILITIES[NARRATIVE_UNIT_TYPE.NONLINEAR_FLASHBACK] = 0
NARRATIVE_UNIT_TYPE_PROBABILITIES[NARRATIVE_UNIT_TYPE.NONLINEAR_FLASHFORWARD] = 0

interface NarrativeUnit {
    id: number
    previousUnitId?: number
    type?: NARRATIVE_UNIT_TYPE
    mediumInstance?: MediumInstance
}

enum MEDIUM_TYPE {
    AV,
    MUSIC,
    FINE_ART,
    LITERATURE,
    MASSMEDIA,
    MIND
}
interface Medium {
    // Main settings
    key: string
    name: string
    type: MEDIUM_TYPE
    // Structure and randomness
    defaultWeight: number
    // Possible genres and qualities
    hasGenre: boolean
    genres?: MediumGenre[]
    // Text
    transitionVerbs: string[]
}

interface MediumQuality {
    key: string
    name: string,
    modifiers: string[]
}

interface MediumGenre {
    key: string,
    name: string
}

interface MediumInstance {
    id: number
    medium: Medium
    mediumGenre?: MediumGenre,
    qualities: MediumQuality[]
    story: Story
}

// TODO: Characters, etc.
interface Character {
    key: string
    name: string
}

interface Story {
    themes: StoryTheme[],
    qualities: StoryQuality[]
}
interface StoryTheme {
    key: string
    name: string
    modifiers: string[]
}

const DB_STORY_THEMES: StoryTheme[] = [
    {
        key: 'love',
        name: 'love',
        modifiers: ['unrequited', 'motherly', 'fatherly', 'friendly', 'tragic', 'pragmatic']
    },
    {
        key: 'hate',
        name: 'hate',
        modifiers: []
    },
    {
        key: 'friendship',
        name: 'friendship',
        modifiers: []
    },
    {
        key: 'fight',
        name: 'fight',
        modifiers: ['evil', 'corporations', 'system']
    },
    {
        key: 'betrayal',
        name: 'betrayal',
        modifiers: []
    },
    {
        key: 'failure',
        name: 'failure',
        modifiers: []
    }
]

interface StoryQuality {
    key: string
    name: string
    modifiers: string[]
}

const DB_STORY_QUALITIES: StoryQuality[] = [
    {
        key: 'sad',
        name: 'sad',
        modifiers: []
    }
]

const DB_MEDIA: Medium[] = [
    {
        key: 'movie',
        name: 'movie',
        type: MEDIUM_TYPE.AV,
        defaultWeight: 50,
        hasGenre: true,
        genres: [
            {key: 'action', name: 'action'},
            {key: 'drama', name: 'drama'},
            {key: 'comedy', name: 'comedy'},
            {key: 'detective', name: 'detective'},
            {key: 'noir', name: 'noir'},
            {key: 'romantic', name: 'romantic'},
            {key: 'scifi', name: 'scifi'},
            {key: 'historical', name: 'historical'},
            {key: 'fantasy', name: 'fantasy'}
        ],
        transitionVerbs: ['see']
    },
    {
        key: 'song',
        name: 'song',
        type: MEDIUM_TYPE.MUSIC,
        defaultWeight: 50,
        hasGenre: true,
        genres: [
            {key: 'pop', name: 'pop'},
            {key: 'rock', name: 'rock'},
            {key: 'jazz', name: 'jazz'},
            {key: 'soul', name: 'soul'},
            {key: 'blues', name: 'blues'},
            {key: 'rap', name: 'rap'},
            {key: 'indie', name: 'indie'},
            {key: 'punk', name: 'punk'},
            {key: 'folk', name: 'folk'},
            {key: 'country', name: 'country'}
        ],
        transitionVerbs: ['hear']
    }
]

const DB_MEDIA_QUALITIES: MediumQuality[] = [
    {
        key: 'old',
        name: 'old',
        modifiers: []
    },
    {
        key: 'famous',
        name: 'famous',
        modifiers: []
    },
    {
        key: 'b',
        name: 'b',
        modifiers: []
    },
    {
        key: 'new',
        name: 'new',
        modifiers: ['', 'relatively']
    },
    {
        key: 'acclaimed',
        name: 'acclaimed',
        modifiers: []
    },
    {
        key: 'controversial',
        name: 'controversial',
        modifiers: []
    }
]

// ===
// === FUNCTIONS
// ===
const DEFAULT_NARRATIVE_SEQUENCE_LENGTH = 5

export function generateNarrativeSequence (): NarrativeSequence {
    const ns: NarrativeSequence = {
        units: []
    }

    range(0, DEFAULT_NARRATIVE_SEQUENCE_LENGTH).map(i => {
        ns.units.push(generateNarrativeUnit())
    })

    return ns
}

let NARRATIVE_UNIT_COUNTER = 1
export function generateNarrativeUnit (previousUnitId?: number): NarrativeUnit {
    // Create the NU and assign an ID
    const nu: NarrativeUnit = {
        id: NARRATIVE_UNIT_COUNTER,
        previousUnitId: previousUnitId
    }
    NARRATIVE_UNIT_COUNTER++

    // We first determine the type of the unit
    const probability = weightedRandom(Object.values(NARRATIVE_UNIT_TYPE_PROBABILITIES))
    nu.type = Object.keys(NARRATIVE_UNIT_TYPE_PROBABILITIES)[probability] as NARRATIVE_UNIT_TYPE

    // Grab a medium for the NU
    nu.mediumInstance = generateMediumInstance()

    return nu
}

let MEDIUM_COUNTER = 1
export function generateMediumInstance (): MediumInstance {
    // Determine what medium are we generating
    const weights = DB_MEDIA.map(m => m.defaultWeight)
    const mediumIndex = weightedRandom(weights)

    // Create the structure
    const medium: MediumInstance = {
        id: MEDIUM_COUNTER,
        medium: clone(DB_MEDIA[mediumIndex]),
        qualities: [],
        story: generateStory()
    }
    MEDIUM_COUNTER++

    if (medium.medium.hasGenre) {
        medium.mediumGenre = getRandomValueFromArray(medium.medium.genres)
    }

    // TODO: Do we do more than one quality?
    medium.qualities.push(generateMediumQuality())

    return medium
}

export function generateMediumQuality (): MediumQuality {
    const weights = DB_MEDIA_QUALITIES.map(m => 1)
    const qualityIndex = weightedRandom(weights)

    return clone(DB_MEDIA_QUALITIES[qualityIndex])
}

export function generateStory (): Story {
    const s: Story = {
        themes: [],
        qualities: []
    }

    // Get the themes
    s.themes.push(generateStoryTheme())

    // Get the qualities

    return s
}

export function generateStoryTheme (): StoryTheme {
    const weights = DB_STORY_THEMES.map(m => 1)
    const themeIndex = weightedRandom(weights)

    return clone(DB_STORY_THEMES[themeIndex])
}

// TODO: This is just a stub.
export function generateStoryQuality () {
}

// Returns an array of texts to be used for one unit.
export function generateNarrativeUnitText (): string[] {
    const res = []

    return res
}

// Returns a single line of text used for transition
export function generateNarrativeUnitTransition (): string {
    return ``
}