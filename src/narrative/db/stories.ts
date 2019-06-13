import {StoryTheme, StoryQuality, StoryCharacter} from '../engine'

export const DB_STORY_THEMES: StoryTheme[] = [
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

export const DB_STORY_QUALITIES: StoryQuality[] = [
    {
        key: 'sad',
        name: 'sad',
        modifiers: []
    }
]

export const DB_STORY_CHARACTERS: StoryCharacter[] = [
    {
        key: 'couple',
        name: '',
        modifiers: []
    },
    {
        key: 'man',
        name: '',
        modifiers: []
    },
    {
        key: 'woman',
        name: '',
        modifiers: []
    },
    {
        key: 'child',
        name: '',
        modifiers: []
    },
    {
        key: 'friends',
        name: '',
        modifiers: []
    },
    {
        key: 'famous person',
        name: '',
        modifiers: []
    }
]