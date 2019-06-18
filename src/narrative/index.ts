import {range, clone, flatten, concat} from 'ramda'
import axios from 'axios'

import {RandomGenerator} from './random'

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
    ThoughtQuality,
    ThoughtSubject,
    ThoughtReason
} from './engine'

import {DB_MEDIA, DB_MEDIA_QUALITIES} from './db/media'
import {DB_NARRATIVE_THEMES, DB_NARRATIVE_CHARACTERS, DB_NARRATIVE_LOCATIONS, DB_NARRATIVE_AMBIENCES} from './db/narrative'
import {DB_STORY_THEMES, DB_STORY_QUALITIES, DB_STORY_CHARACTERS, DB_STORY_SITUATIONS} from './db/stories'
import { DB_THOUGHTS, DB_THOUGHT_SUBJECT, DB_THOUGHT_REASONS, DB_THOUGHT_QUALITY } from './db/thought';
import { DB_AMBIENCE_WORDS } from './db/ambience';

// ===
// === FUNCTIONS
// ===
const DEFALT_NARRATIVE_SEQUENCE_PARTS = 2
const DEFAULT_NARRATIVE_SEQUENCE_UNIT_LENGTH = 2

export function generateNarrativeSequence (rng: RandomGenerator): NarrativeSequence {
    const ns: NarrativeSequence = {
        units: [],
        themes: [],
        characters: [],
        location: generateNarrativeLocation(rng),
        ambience: generateNarrativeAmbience(rng),
        thought: generateThoughtInstance(rng)
    }

    range(0, DEFALT_NARRATIVE_SEQUENCE_PARTS).map(i => {
        let previousUnit: NarrativeUnit = null
        range(0, DEFAULT_NARRATIVE_SEQUENCE_UNIT_LENGTH).map(i => {
            if (!previousUnit) {
                previousUnit = generateNarrativeUnit(rng, null)
            } else {
                previousUnit = generateNarrativeUnit(rng, previousUnit.id)
            }
            ns.units.push(previousUnit)
        })
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
        medium.mediumGenre = rng.randomItem(medium.medium.genres)
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
    s.qualities.push(rng.randomItem(DB_STORY_QUALITIES))

    // Get the characters
    s.characters.push(rng.randomItem(DB_STORY_CHARACTERS))

    // We don't have plots right now

    // Get the story situations
    s.situations.push(rng.randomItem(DB_STORY_SITUATIONS))

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

    const thought: Thought = rng.randomItem(DB_THOUGHTS)
    const subject: ThoughtSubject = rng.randomItem(DB_THOUGHT_SUBJECT)

    const positiveGrammarResult = rng.expandGrammar(thought.introductoryGrammar) + ' ' + rng.expandGrammar(subject.positiveGrammar) + '.'
    const negativeGrammarResult = rng.expandGrammar(thought.introductoryGrammar) + ' ' + rng.expandGrammar(subject.negativeGrammar) + '.'

    const reason: ThoughtReason = rng.randomItem(DB_THOUGHT_REASONS)

    const t: ThoughtInstance = {
        thought: thought,
        subject: subject,
        positiveQuality: positiveQuality,
        negativeQuality: negativeQuality,
        reason,

        positiveGrammarResult,
        negativeGrammarResult,

        positiveQualityResult: rng.expandGrammar(positiveQuality.grammar, {
            thoughtType: rng.expandGrammar(thought.typeGrammar),
            thoughtSubject: rng.expandGrammar(subject.subjectGrammar)
        }),
        negativeQualityResult: rng.expandGrammar(negativeQuality.grammar, {
            thoughtType: rng.expandGrammar(thought.typeGrammar),
            thoughtSubject: rng.expandGrammar(subject.subjectGrammar)
        }),

        reasonResult: rng.expandGrammar(reason.grammar)
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

// Returns an intro to a new narrative unit
export function  generateMediumIntro (nu: NarrativeUnit, rng: RandomGenerator): string {
    const injectableGrammar = Object.assign(
        {},
        getMediumGrammarRules(nu.mediumInstance)
    )

    return rng.expandGrammar(nu.mediumInstance.medium.intro, injectableGrammar)
}

// Returns a nested intro to a new narrative unit
export function generateMediumNesting (nu: NarrativeUnit, previousNu: NarrativeUnit, rng: RandomGenerator): string {
    const injectableGrammar = Object.assign(
        {},
        getMediumGrammarRules(nu.mediumInstance)
    )

    const availableTransitions = previousNu.mediumInstance.medium.transitions.filter(t => {
        return t.to.indexOf('*') > -1 || t.to.indexOf(nu.mediumInstance.medium.key) > -1
    })
    const transition = rng.randomItem(availableTransitions)

    return rng.expandGrammar(transition.grammar, injectableGrammar)
}

export function getMediumGrammarRules (mi: MediumInstance): any {
    const rules: any = {}

    const mediumQuality = mi.qualities.map(q => q.name).join(' ')
    let mediumGenre = ''
    if (mi.mediumGenre) {
        mediumGenre = mi.mediumGenre.name
    }

    rules.newMediumName = mi.medium.name
    rules.newMedium = `${mediumQuality} ${mediumGenre} ${mi.medium.name}`

    return rules
}

// ===
// === STILL API
// ===
export async function getPhotoForTags (tags: string[]) {
    const res = await axios.get('http://localhost:2019/still/' + tags.join(','))
    return res.data.still
}

export async function getStillForNarrativeSequence (ns: NarrativeSequence) {
    const tags = flatten<string>(ns.characters.map(c => c.stillTags))
    const stillUrl = await getPhotoForTags(tags)

    return stillUrl
}

export async function getStillForNarrativeUnit (nu: NarrativeUnit) {
    const tags = concat(
        flatten<string>(nu.mediumInstance.story.characters.map(c => c.stillTags)),
        flatten<string>(nu.mediumInstance.story.themes.map(t => t.stillTags))
    )

    const stillUrl = await getPhotoForTags(tags)
    return stillUrl
}

export async function getStillForThought (t: ThoughtInstance) {
    const tags = t.subject.stillTags

    const stillUrl = await getPhotoForTags(tags)
    return stillUrl
}

export async function getStillForMovingOn () {
    const stillUrl = await getPhotoForTags(['moving on'])
    return stillUrl
}

// ===
// TEXT GENERATION
// ===
export function describeStory (nu: NarrativeUnit, rng: RandomGenerator) {
    return rng.expandGrammar(nu.mediumInstance.medium.story, {
        themes: nu.mediumInstance.story.themes.map(t => {
            let finalName = t.name

            if (t.modifiers.length) {
                finalName = `${rng.randomItem(t.modifiers)} ${t.name}`
            }

            return finalName
        }).join(' and '),
        characters: nu.mediumInstance.story.characters.map(c => {
            let name = ''
            if (Array.isArray(c.name)) {
                name = rng.randomItem(c.name)
            } else {
                name = c.name
            }

            if (c.modifiers.length) {
                name = `${rng.randomItem(c.modifiers)} ${name}`
            }

            if (!c.isPlural) {
                name = rng.expandGrammar({origin: ['#name.a#'], rules: {name}})
            }

            return name
        }).join(' and ')
    })
}

export function describeStoryQuality (nu: NarrativeUnit, rng: RandomGenerator) {
    const grammar: NarrativeGrammar = {
        origin: [
            'It is #adjective# #quality#.',
            '#adjectiveAlways.capitalize# #quality#.'
        ],
        rules: {
            adjective: ['', '', '', 'very', 'really', 'so'],
            adjectiveAlways: ['very', 'really', 'so']
        }
    }

    return rng.expandGrammar(grammar, {
        quality: nu.mediumInstance.story.qualities.map(q => q.name).join(' and ')
    })
}

// Note: Text generation should not include punctuation?
export function describeNarrativeLocation (ns: NarrativeSequence, rng: RandomGenerator) {
    return rng.expandGrammar(ns.location.grammar)
}

export function introduceNarrativeCharacter (ns: NarrativeSequence, rng: RandomGenerator) {
    const characterStrings = ns.characters.map(c => {
        const n = rng.randomItem(c.name)
        if (c.isYour) {
            return `your ${n}`
        } else {
            return n
        }
    })

    ns.characterRendered = characterStrings.join(' and ')
    const grammar: NarrativeGrammar = {
        origin: [`#subject.capitalize# is next to you`],
        rules: {
            subject: characterStrings.join(' and ')
        }
    }

    return rng.expandGrammar(grammar)
}

export function removeNarrativeCharacter (ns: NarrativeSequence, rng: RandomGenerator) {
    const grammar: NarrativeGrammar = {
        origin: [`#subject.capitalize# is no longer with you`],
        rules: {
            subject: ns.characterRendered
        }
    }

    return rng.expandGrammar(grammar)
}

export function describeAmbience (ns: NarrativeSequence, rng: RandomGenerator) {
    return rng.expandGrammar(ns.ambience.grammar)
}

export function getExcerciseName (ns: NarrativeSequence, rng: RandomGenerator) {
    return `Excercise #${rng.randomNumber(1, 999)}: ` + ns.thought.subject.theme
}

// ===
// === STATICAL GENERATORS
// ===
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

export function describeMovingOn (rng: RandomGenerator): string[] {
    const grammar: NarrativeGrammar = {
        origin: [
            'But now we are in #betterPlace#.',
            'But everything is #fine# now.',
            'However, it is all #fine# now.',
            'But #betterSubjectPlural# are much better now.',
            'But #betterSubjectSingular# is much better now.'
        ],
        rules: {
            betterPlace: ['a better place', 'a better world', 'better times'],
            fine: ['fine', 'well', 'great', 'wonderful', 'beautiful', 'all right'],
            betterSubjectPlural: ['you', 'we'],
            betterSubjectSingular: ['world', 'society', 'life']
        }
    }
    const grammar2: NarrativeGrammar = {
        origin: [
            '#moveOnSubject.capitalize# can move on.',
            '#moveOnSubject.capitalize# can move on.',
            '#subject.capitalize# can be like it used to.',
            '#subject.capitalize# will be liked it used to.'
        ],
        rules: {
            subject: ['everything', 'life', 'world', 'universe'],
            moveOnSubject: ['we', 'you', 'world', 'society', 'people']
        }
    }

    return [rng.expandGrammar(grammar), rng.expandGrammar(grammar2)]
}

const AMBIENT_WORDS_COUNTS = [1, 2, 3, 4]
const AMBIENT_WORDS_WEIGHTS = [35, 30, 25, 10]
export function describeWordAmbience (rng: RandomGenerator): string[] {
    const numberOfWords = AMBIENT_WORDS_COUNTS[rng.weighted(AMBIENT_WORDS_WEIGHTS)]
    return range(0, numberOfWords).map(i => {
        return rng.randomItem(DB_AMBIENCE_WORDS)
    })
}