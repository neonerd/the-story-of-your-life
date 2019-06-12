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
    themes: NarrativeTheme[]
}

// The basic themes that the narrative should carry
export interface NarrativeTheme {
    key: string
    name: string
    defaultWeight: number
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
    previousUnitId?: number
    type?: NARRATIVE_UNIT_TYPE
    mediumInstance?: MediumInstance
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
}

// I.e. an acclaimed movie
export interface MediumQuality {
    key: string
    name: string,
    modifiers: string[]
}

// I.e. a crime movie
export interface MediumGenre {
    key: string,
    name: string
}

// Text generation rules from transitioning from one medium to another
export interface MediumTransition {
    from: string[],
    to: string[]
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
    qualities: StoryQuality[]
}
export interface StoryTheme {
    key: string
    name: string
    modifiers: string[]
}
export interface StoryQuality {
    key: string
    name: string
    modifiers: string[]
}





// TODO: Characters, etc.
export interface Character {
    key: string
    name: string
}