import {range, clone} from 'ramda'

import {RandomGenerator} from './random'
import {getRandomValueFromArray} from './lib'

import {
    NarrativeSequence,
    NarrativeUnit,
    NARRATIVE_UNIT_TYPE,
    NARRATIVE_UNIT_TYPE_PROBABILITIES,
    MediumQuality,
    MediumInstance,
    Story,
    StoryTheme
} from './engine'

import {DB_MEDIA, DB_MEDIA_QUALITIES} from './db/media'
import {DB_NARRATIVE_THEMES} from './db/narrative'
import {DB_STORY_THEMES} from './db/stories'

// ===
// === FUNCTIONS
// ===
const DEFAULT_NARRATIVE_SEQUENCE_LENGTH = 5

export function generateNarrativeSequence (rng: RandomGenerator): NarrativeSequence {
    const ns: NarrativeSequence = {
        units: [],
        themes: []
    }

    range(0, DEFAULT_NARRATIVE_SEQUENCE_LENGTH).map(i => {
        ns.units.push(generateNarrativeUnit(rng))
    })

    range(0, 2).map(i => {
        const probability = rng.weighted(DB_NARRATIVE_THEMES.map(t => t.defaultWeight))
        ns.themes.push(clone(DB_NARRATIVE_THEMES[probability]))
    })

    return ns
}

let NARRATIVE_UNIT_COUNTER = 1
export function generateNarrativeUnit (rng: RandomGenerator, previousUnitId?: number): NarrativeUnit {
    // Create the NU and assign an ID
    const nu: NarrativeUnit = {
        id: NARRATIVE_UNIT_COUNTER,
        previousUnitId: previousUnitId
    }
    NARRATIVE_UNIT_COUNTER++

    // We first determine the type of the unit
    const probability = rng.weighted(Object.values(NARRATIVE_UNIT_TYPE_PROBABILITIES))
    nu.type = Object.keys(NARRATIVE_UNIT_TYPE_PROBABILITIES)[probability] as NARRATIVE_UNIT_TYPE

    // Grab a medium for the NU
    nu.mediumInstance = generateMediumInstance(rng)

    return nu
}

let MEDIUM_COUNTER = 1
export function generateMediumInstance (rng: RandomGenerator): MediumInstance {
    // Determine what medium are we generating
    const weights = DB_MEDIA.map(m => m.defaultWeight)
    const mediumIndex = rng.weighted(weights)

    // Create the structure
    const medium: MediumInstance = {
        id: MEDIUM_COUNTER,
        medium: clone(DB_MEDIA[mediumIndex]),
        qualities: [],
        story: generateStory(rng)
    }
    MEDIUM_COUNTER++

    if (medium.medium.hasGenre) {
        medium.mediumGenre = getRandomValueFromArray(medium.medium.genres)
    }

    // TODO: Do we do more than one quality?
    medium.qualities.push(generateMediumQuality(rng))

    return medium
}

export function generateMediumQuality (rng: RandomGenerator): MediumQuality {
    const weights = DB_MEDIA_QUALITIES.map(m => 1)
    const qualityIndex = rng.weighted(weights)

    return clone(DB_MEDIA_QUALITIES[qualityIndex])
}

export function generateStory (rng: RandomGenerator): Story {
    const s: Story = {
        themes: [],
        qualities: []
    }

    // Get the themes
    s.themes.push(generateStoryTheme(rng))

    // Get the qualities

    return s
}

export function generateStoryTheme (rng: RandomGenerator): StoryTheme {
    const weights = DB_STORY_THEMES.map(m => 1)
    const themeIndex = rng.weighted(weights)

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