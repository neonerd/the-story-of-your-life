import {StoryTheme, StoryQuality} from '../engine'

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