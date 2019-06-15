import { NarrativeTheme, NarrativeCharacter, NarrativeAmbience, NarrativeLocation } from "../engine";

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
        name: ['grandmother', 'grandmom'],
        isYour: true
    },
    {
        key: 'granddad',
        name: ['granddad', 'grandfather'],
        isYour: true
    },
    {
        key: 'mum',
        name: ['mum', 'mother'],
        isYour: true
    },
    {
        key: 'dad',
        name: ['dad', 'father'],
        isYour: true
    },
    {
        key: 'friend',
        name: ['best friend', 'closest friend', 'friend'],
        isYour: true
    },
    {
        key: 'aunt',
        name: ['favourite aunt', 'aunt'],
        isYour: true
    },
    {
        key: 'cousin',
        name: ['favourite cousin'],
        isYour: true
    },
    {
        key: 'uncle',
        name: ['favourite uncle', 'uncle'],
        isYour: true
    }
]

export const DB_NARRATIVE_LOCATIONS: NarrativeLocation[] = [
    {
        key: 'living room',
        grammar: {
            origin: [
                'sitting #sit#',
            ],
            rules: {
                sit: ['on a couch', 'on a sofa', 'in an armchair']
            }
        }
    },
    {
        key: 'bedroom',
        grammar: {
            origin: [
                'lying in your bed',
                'chilling in your room',
                'relaxing in your bedroom'
            ],
            rules: {
                
            }
        }
    },
    {
        key: 'kitchen',
        grammar: {
            origin: [
                'having lunch in the kitchen',
                'dining in the kitchen'
            ],
            rules: {
                
            }
        }
    },
    {
        key: 'terrace',
        grammar: {
            origin: [
                'sitting on the #subject#'
            ],
            rules: {
                subject: ['terrace', 'porch']
            }
        }
    },
    {
        key: 'garden',
        grammar: {
            origin: [
                'sitting in the garden'
            ],
            rules: {
            }
        }
    }
]

export const DB_NARRATIVE_AMBIENCES: NarrativeAmbience[] = [
    {
        key: 'sound',
        grammar: {
            origin: [
                'You can hear #subjectOutside# outside.',
                'An old clock is ticking nearby.',
                'You can hear #subjectInside#.'
            ],
            rules: {
                subjectOutside: [
                    'kids playing',
                    'birds chirping',
                    'the rain',
                    'wind blowing'
                ],
                subjectInside: [
                    'someone typing on a #typingTool#',
                    'someone '
                ],
                typingTool: [
                    'keyboard',
                    'typewriter'
                ]
            }
        }
    },
    {
        key: 'smell',
        grammar: {
            origin: [
                'You can smell #subject#.'
            ],
            rules: {
                subject: [
                    'fresh #bakery#',
                    'cut grass',
                    'lunch',
                    'the laundry',
                    'fresh rain on hot pavement',
                    'wet asphalt',
                    'old books',
                    'the ocean',
                    'rain',
                    'a thunderstorm coming',
                    'the forest'
                ],
                bakery: [
                    'bread',
                    'cookies',
                    'cake'
                ]
            }
        }
    },
    {
        key: 'weather',
        grammar: {
            origin: [

            ],
            rules: {

            }
        }
    }
]