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
            'someone who you love',
            'someone who you respect',
            'someone who you look up to',
            'someone who cared about you',
            'someone who is important'
        ],
        stillTags: [
            'man',
            'woman'
        ]
    },
    {
        key: 'grandmom',
        name: ['grandmother', 'grandmom'],
        isYour: true,
        stillTags: [
            'woman',
            'childhood'
        ]
    },
    {
        key: 'granddad',
        name: ['granddad', 'grandfather'],
        isYour: true,
        stillTags: [
            'man',
            'childhood'   
        ]
    },
    {
        key: 'mum',
        name: ['mum', 'mother'],
        isYour: true,
        stillTags: [
            'woman',
            'childhood'
        ]
    },
    {
        key: 'dad',
        name: ['dad', 'father'],
        isYour: true,
        stillTags: [
            'man',
            'childhood'
        ]
    },
    {
        key: 'friend',
        name: ['best friend', 'closest friend', 'friend'],
        isYour: true,
        stillTags: [
            'childhood'
        ]
    },
    {
        key: 'aunt',
        name: ['favourite aunt', 'aunt', 'distant aunt', 'only aunt'],
        isYour: true,
        stillTags: [
            'woman',
            'childhood'
        ]
    },
    {
        key: 'cousin',
        name: ['favourite cousin', 'only cousin', 'cousin', 'distant cousin'],
        isYour: true,
        stillTags: [
            'childhood'
        ]
    },
    {
        key: 'uncle',
        name: ['favourite uncle', 'only uncle', 'distant uncle', 'uncle'],
        isYour: true,
        stillTags: [
            'man',
            'childhood'
        ]
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
                '#objectsNearby.a.capitalize# nearby.',
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
                    'someone #activity#'
                ],
                typingTool: [
                    'keyboard',
                    'typewriter'
                ],
                activity: [
                    'cooking',
                    'singing',
                    'talking',
                    'laughing',
                    'chatting',
                    'watching TV',
                    'listening to the radio'
                ],
                objectsNearby: [
                    'old clock is ticking',
                    'radio is playing',
                    'TV is playing'
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
                    'cooking',
                    'fresh laundry',
                    'fresh rain evaporating from hot pavement',
                    'wet asphalt',
                    'old books',
                    'the ocean',
                    'rain',
                    'a thunderstorm coming',
                    'the forest',
                    'hay'
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
                "It's #weather#.",
            ],
            rules: {
                weather: [
                    'hot', 
                    'cold', 
                    'breezy', 
                    'chilly', 
                    'snowing', 
                    'raining',
                    'a #weatherType# #season# #timeOfDay#',
                ],
                season: ['summer', 'autumn'],
                timeOfDay: ['evening', 'afternoon', 'morning'],
                weatherType: ['hot', 'rainy']
            }
        }
    }
]