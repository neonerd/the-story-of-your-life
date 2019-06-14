import { NarrativeTheme, NarrativeCharacter } from "../engine";

export const DB_NARRATIVE_THEMES: NarrativeTheme[] = [
    {
        key: 'love',
        name: 'love',
        defaultWeight: 50
    },
    {
        key: 'romance',
        name: 'romance',
        defaultWeight: 50
    },
    {
        key: 'youth',
        name: 'youth',
        defaultWeight: 50
    },
    {
        key: 'childhood',
        name: 'childhood',
        defaultWeight: 50
    },
    {
        key: 'wanderlust',
        name: 'wanderlust',
        defaultWeight: 50
    },
    {
        key: 'hope',
        name: 'hope',
        defaultWeight: 50
    },
    {
        key: 'friendship',
        name: 'friendship',
        defaultWeight: 50
    },
    {
        key: 'family',
        name: 'family',
        defaultWeight: 50
    },
    {
        key: 'summer',
        name: 'summer',
        defaultWeight: 50
    }
]

export const DB_NARRATIVE_CHARACTERS: NarrativeCharacter[] = [
    {
        key: 'someone',
        name: [
            'someone you love',
            'someone who is no longer here',
            'someone who cared about you'
        ],
    },
    {
        key: 'grandmom',
        name: ['grandmother', 'grandmom']
    },
    {
        key: 'granddad',
        name: ['granddad', 'grandfather']
    },
    {
        key: 'mum',
        name: ['mum', 'mother']
    },
    {
        key: 'dad',
        name: ['dad', 'father']
    },
    {
        key: 'friend',
        name: ['best friend', 'closest friend', 'friend']
    }
]