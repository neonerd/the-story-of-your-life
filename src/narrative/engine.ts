const RES_KEYS = {
    'Medium': 'medium_',
    'MediumQuality': 'medium_quality_',
    'StoryTheme': 'story_theme_'    
}

// ===
// === GENERAL NARRATIVE
// ===

// Main narrative sequence instance. There should be only one for each "video".
export interface NarrativeSequence {
    units: NarrativeUnit[],
    themes: NarrativeTheme[],
    characters: NarrativeCharacter[],
    location: NarrativeLocation,
    ambience: NarrativeAmbience
}

// The basic themes that the narrative should carry
export interface NarrativeTheme {
    key: string
    name: string
    defaultWeight: number
}

export interface NarrativeCharacter {
    key: string
    name: string[]
    isPlural?: boolean,
    isYour?: boolean
}

export interface NarrativeAmbience {
    key: string
    grammar: NarrativeGrammar
}

export interface NarrativeLocation {
    key: string
    grammar: NarrativeGrammar
}

export enum NARRATIVE_UNIT_TYPE {
    LINEAR_NESTED = 'LINEAR_NESTED',
    LINEAR_UNNESTED = 'LINEAR_UNNESTED',
    LINEAR_PARALLEL = 'LINEAR_PARALLEL',
    LINEAR_SERIAL = 'LINEAR_SERIAL',
    NONLINEAR_FLASHBACK = 'NONLINEAR_FLASHBACK',
    NONLINEAR_FLASHFORWARD = 'NONLINEAR_FLASHFORWARD'
}

export const NARRATIVE_UNIT_TYPE_PROBABILITIES = {}
NARRATIVE_UNIT_TYPE_PROBABILITIES[NARRATIVE_UNIT_TYPE.LINEAR_NESTED] = 25
NARRATIVE_UNIT_TYPE_PROBABILITIES[NARRATIVE_UNIT_TYPE.LINEAR_UNNESTED] = 25
NARRATIVE_UNIT_TYPE_PROBABILITIES[NARRATIVE_UNIT_TYPE.LINEAR_PARALLEL] = 10
NARRATIVE_UNIT_TYPE_PROBABILITIES[NARRATIVE_UNIT_TYPE.LINEAR_SERIAL] = 25
NARRATIVE_UNIT_TYPE_PROBABILITIES[NARRATIVE_UNIT_TYPE.NONLINEAR_FLASHBACK] = 0
NARRATIVE_UNIT_TYPE_PROBABILITIES[NARRATIVE_UNIT_TYPE.NONLINEAR_FLASHFORWARD] = 0

// Narrative unit is a part of narrative sequence
export interface NarrativeUnit {
    id: number
    // A reference to the previous unit, so we know where to get back to
    previousUnitId?: number
    // Type of the narrative unit, so we know how to transition into it (do we need this?)
    type?: NARRATIVE_UNIT_TYPE
    // Instance of the medium that is contained in the movie
    mediumInstance?: MediumInstance
    // Literary variables
    // The certainity of the narrator
    certainity: number
    // The passion of the narrator
    passion: number
}

export interface NarrativeGrammar {
    origin: string[],
    rules: any
}

// === 
// === MEDIA
// ===
export enum MEDIUM_TYPE {
    AV,
    MUSIC,
    GAME,
    FINE_ART,
    LITERATURE,
    MASSMEDIA,
    MIND
}
// I.e. a movie
export interface Medium {
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
    transitions: MediumTransition[]
    intro: NarrativeGrammar
}
// I.e. an acclaimed movie
export interface MediumQuality {
    key: string
    name: string,
    modifiers: string[],
    applicableMedia: string[]
}
// I.e. a crime movie
export interface MediumGenre {
    key: string,
    name: string
}
// Text generation rules from transitioning from one medium to another
export interface MediumTransition {
    to: string[],
    grammar: NarrativeGrammar
}
// Actual instance of a generated medium
export interface MediumInstance {
    id: number
    medium: Medium
    mediumGenre?: MediumGenre,
    qualities: MediumQuality[]
    story: Story
}

// === 
// === STORIES
// ===
export interface Story {
    themes: StoryTheme[],
    characters: StoryCharacter[],
    situations: StorySituation[],
    plots: StoryPlot[],
    qualities: StoryQuality[]
}
export interface StoryTheme {
    key: string
    name: string|string[]
    modifiers: string[]
}
export interface StoryQuality {
    key: string
    name: string
    modifiers: string[]
}
export interface StoryCharacter {
    key: string
    name: string
    modifiers: string[]
    isPlural?: boolean
}
export interface StorySituation {
    key: string
    grammar: NarrativeGrammar
}
export interface StoryPlot {
    key: string
    name: string
    modifiers: string[]
}

// ===
// === MIND
// ===

export interface Thought {
    key: string
    introductoryGrammar: NarrativeGrammar
}

export interface ThoughtSubject {
    key: string
    positiveGrammar: NarrativeGrammar,
    negativeGrammar: NarrativeGrammar
}

export interface ThoughtQuality {
    key: string
    grammar: NarrativeGrammar
    isNegative?: boolean
}

export interface ThoughtReason {
    key: string
    grammar: NarrativeGrammar
}