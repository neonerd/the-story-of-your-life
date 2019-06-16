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
    StoryTheme,
    NarrativeLocation,
    NarrativeGrammar,
    NarrativeAmbience,
    ThoughtInstance,
    Thought,
    ThoughtQuality
} from './engine'

import {DB_MEDIA, DB_MEDIA_QUALITIES} from './db/media'
import {DB_NARRATIVE_THEMES, DB_NARRATIVE_CHARACTERS, DB_NARRATIVE_LOCATIONS, DB_NARRATIVE_AMBIENCES} from './db/narrative'
import {DB_STORY_THEMES} from './db/stories'
import { DB_THOUGHTS, DB_THOUGHT_SUBJECT, DB_THOUGHT_REASONS, DB_THOUGHT_QUALITY } from './db/thought';

// ===
// === FUNCTIONS
// ===
const DEFAULT_NARRATIVE_SEQUENCE_LENGTH = 5

export function generateNarrativeSequence (rng: RandomGenerator): NarrativeSequence {
    const ns: NarrativeSequence = {
        units: [],
        themes: [],
        characters: [],
        location: generateNarrativeLocation(rng),
        ambience: generateNarrativeAmbience(rng),
        thought: generateThoughtInstance(rng)
    }

    let previousUnit: NarrativeUnit = null
    range(0, DEFAULT_NARRATIVE_SEQUENCE_LENGTH).map(i => {
        if (!previousUnit) {
            previousUnit = generateNarrativeUnit(rng, null)
        } else {
            previousUnit = generateNarrativeUnit(rng, previousUnit.id)
        }
        ns.units.push(previousUnit)
    })

    range(0, 2).map(i => {
        const probability = rng.weighted(DB_NARRATIVE_THEMES.map(t => t.defaultWeight))
        ns.themes.push(clone(DB_NARRATIVE_THEMES[probability]))
    })

    range(0, 1).map(i => {
        ns.characters.push(clone(rng.randomItem(DB_NARRATIVE_CHARACTERS)))
    })

    return ns
}

export function generateNarrativeLocation (rng: RandomGenerator): NarrativeLocation {
    return rng.randomItem(DB_NARRATIVE_LOCATIONS)
}

export function generateNarrativeAmbience (rng: RandomGenerator): NarrativeAmbience {
    return rng.randomItem(DB_NARRATIVE_AMBIENCES)
}

let NARRATIVE_UNIT_COUNTER = 1
export function generateNarrativeUnit (rng: RandomGenerator, previousUnitId?: number): NarrativeUnit {
    // Create the NU and assign an ID
    const nu: NarrativeUnit = {
        id: NARRATIVE_UNIT_COUNTER,
        previousUnitId: previousUnitId,
        certainity: 1,
        passion: 0
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
    // Probably not, says Andrej on 13.6.2019 at 00:39AM
    medium.qualities.push(generateMediumQuality(rng, medium.medium.key))

    return medium
}

export function generateMediumQuality (rng: RandomGenerator, mediumKey: string): MediumQuality {
    const filteredQualities = DB_MEDIA_QUALITIES.filter(q => {
        if (q.applicableMedia.indexOf('*') > -1) {
            return true
        }

        if (q.applicableMedia.indexOf(mediumKey) > -1) {
            return true
        }

        return false
    })
    
    const weights = filteredQualities.map(m => 1)
    const qualityIndex = rng.weighted(weights)

    return clone(filteredQualities[qualityIndex])
}

export function generateStory (rng: RandomGenerator): Story {
    const s: Story = {
        themes: [],
        qualities: [],
        characters: [],
        plots: [],
        situations: []
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

// ===
// === THOUGHTS
// ===
export function generateThoughtInstance (rng: RandomGenerator): ThoughtInstance {
    const positiveQuality: ThoughtQuality = rng.randomItem(DB_THOUGHT_QUALITY.filter(q => !q.isNegative))
    const negativeQuality = rng.randomItem(DB_THOUGHT_QUALITY.filter(q => q.isNegative).filter(q => q.isNegativeTo.indexOf(positiveQuality.key) > -1))

    const t: ThoughtInstance = {
        thought: rng.randomItem(DB_THOUGHTS),
        subject: rng.randomItem(DB_THOUGHT_SUBJECT),
        positiveQuality: positiveQuality,
        negativeQuality: negativeQuality,
        reason: rng.randomItem(DB_THOUGHT_REASONS),

        positiveGrammarResult: rng.expandGrammar(positiveQuality.grammar),
        negativeGrammarResult: rng.expandGrammar(negativeQuality.grammar)
    }

    return t
}

// ===
// === NARRATIVE UNITS
// ===

// Returns an array of texts to be used for one unit.
export function generateNarrativeUnitText (): string[] {
    const res = []

    return res
}

// Returns a single line of text used for transition
export function generateNarrativeUnitTransition (): string {
    return ``
}

export function generateNarrativeUnitIntro (nu: NarrativeUnit, rng: RandomGenerator): string {
    const injectableGrammar = Object.assign(
        {},
        getMediumGrammarRules(nu.mediumInstance)
    )

    return rng.expandGrammar(nu.mediumInstance.medium.intro, injectableGrammar)
}

export function getMediumGrammarRules (mi: MediumInstance): any {
    const rules: any = {}

    const mediumQuality = mi.qualities.map(q => q.name).join(' ')

    rules.newMediumName = mi.medium.name
    rules.newMedium = `${mediumQuality} ${mi.medium.name}`

    return rules
}





// ===
// TEXT GENERATION
// ===

// Note: Text generation should not include punctuation?
export function describeNarrativeLocation (ns: NarrativeSequence, rng: RandomGenerator) {
    return rng.expandGrammar(ns.location.grammar)
}

export function introduceNarrativeCharacter (ns: NarrativeSequence, rng: RandomGenerator) {
    const characterStrings = ns.characters.map(c => {
        return rng.randomItem(c.name)
    })

    const grammar: NarrativeGrammar = {
        origin: [`#subject.capitalize# is next to you`],
        rules: {
            subject: characterStrings.join(' and ')
        }
    }

    return rng.expandGrammar(grammar)
}

export function describeAmbience (ns: NarrativeSequence, rng: RandomGenerator) {
    return rng.expandGrammar(ns.ambience.grammar)
}

export function describeTimePassage (rng: RandomGenerator) {
    const grammar: NarrativeGrammar = {
        origin: [
            'Time passes.',
            'Time moves on.',
            'But life continues.',
            'But life goes on.',
            'But life passes.'
        ],
        rules: {

        }
    }

    return rng.expandGrammar(grammar)
}