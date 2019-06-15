import { Medium, MediumQuality, MEDIUM_TYPE, MediumTransition } from "../engine";

const MUSIC_GENRES = [
    {key: 'pop', name: 'pop'},
    {key: 'rock', name: 'rock'},
    {key: 'jazz', name: 'jazz'},
    {key: 'soul', name: 'soul'},
    {key: 'blues', name: 'blues'},
    {key: 'hip-hop', name: 'hip-hop'},
    {key: 'indie', name: 'indie'},
    {key: 'punk', name: 'punk'},
    {key: 'folk', name: 'folk'},
    {key: 'country', name: 'country'}
]

const CINEMA_GENRES = [
    {key: 'action', name: 'action movie'},
    {key: 'drama', name: 'drama'},
    {key: 'comedy', name: 'comedy'},
    {key: 'detective', name: 'detective movie'},
    {key: 'noir', name: 'noir'},
    {key: 'romantic', name: 'romantic movie'},
    {key: 'scifi', name: 'scifi'},
    {key: 'historical', name: 'historical movie'},
    {key: 'fantasy', name: 'fantasy movie'},
    {key: 'thriller', name: 'thriller'}
]   

const LITERATURE_GENRES = [
    {key: 'crime', name: 'crime'},
    {key: 'paperback', name: 'paperback'},
    {key: 'fantasy', name: 'fantasy'}
]

export const DB_MEDIA: Medium[] = [
    //
    // AV
    //
    {
        key: 'movie',
        name: 'movie',
        type: MEDIUM_TYPE.AV,
        defaultWeight: 50,
        hasGenre: true,
        genres: CINEMA_GENRES,
        intro: {
            origin: [
                'You are watching #newMedium.a#.'
            ],
            rules: {

            }
        },
        transitionVerbs: ['see'],
        transitions: [
            {
                to: ['movie'],
                grammar: {
                    origin: [
                        'You can see #newMedium.a# on a TV set in one of the scenes.'
                    ],
                    rules: {

                    }
                }
            },
            {
                to: ['tv', 'talkshow', 'videogame', 'book', 'comic book', 'song', 'album', 'painting', 'statue'],
                grammar: {
                    origin: [
                        'You can see #newMedium.a# at one point in the movie.'
                    ],
                    rules: {

                    }
                }
            }
        ]
    },
    {
        key: 'tv',
        name: 'episode of tv series',
        type: MEDIUM_TYPE.AV,
        defaultWeight: 50,
        hasGenre: true,
        genres: CINEMA_GENRES,
        intro: {
            origin: [
                'You are watching #newMedium.a#.'
            ],
            rules: {

            }
        },
        transitionVerbs: ['see'],
        transitions: [
            {
                to: ['tv'],
                grammar: {
                    origin: [
                        ''
                    ],
                    rules: {

                    }
            }
            },
            {
                to: ['movie', 'talkshow', 'videogame', 'book', 'comic book', 'song', 'album', 'painting', 'statue'],
                grammar: {
                    origin: [
                        ''
                    ],
                    rules: {

                    }
            }
            }
        ]
    },
    {
        key: 'talkshow',
        name: 'talkshow',
        type: MEDIUM_TYPE.AV,
        defaultWeight: 50,
        hasGenre: true,
        genres: [],
        intro: {
            origin: [
                'You are watching #newMedium.a#.'
            ],
            rules: {

            }
        },
        transitionVerbs: ['see'],
        transitions: [
            {
                to: ['movie', 'tv', 'videogame', 'song', 'album', 'painting', 'statue', 'book', 'comic book'],
                grammar: {
                    origin: [
                        'The talkshow host talks about a #newMedium.',
                        'One of the guests mentions a #newMedium.'
                    ],
                    rules: {}
            }
            }
        ]
    },
    //
    // GAMES
    //
    // {
    //     key: 'videogame',
    //     name: 'videogame',
    //     type: MEDIUM_TYPE.GAME,
    //     defaultWeight: 50,
    //     hasGenre: true,
    //     genres: [],
    //     intro: {
    //         origin: [
    //             'You are playing #newMedium.a#.'
    //         ],
    //         rules: {

    //         }
    //     },
    //     transitionVerbs: ['see'],
    //     transitions: [
    //         {
    //             to: ['videogame'],
    //             grammar: {
    //                 origin: [
    //                     'The game contains '
    //                 ],
    //                 rules: {}
    //         }
    //         },
    //         {
    //             to: ['movie', 'tv', 'videogame', 'song', 'album', 'painting', 'statue', 'book', 'comic book'],
    //             grammar: {
    //                 origin: [
    //                     'The characters talk about #newMedium.a# at one point in the story.',
    //                     'You can #transitiveVerb# #newMedium.a# in one of the levels of the videogame.'
    //                 ],
    //                 rules: {}
    //         }
    //         }
    //     ]
    // },
    //
    // MUSIC
    //
    {
        key: 'song',
        name: 'song',
        type: MEDIUM_TYPE.MUSIC,
        defaultWeight: 50,
        hasGenre: true,
        genres: MUSIC_GENRES,
        intro: {
            origin: [
                'You are listening to #newMedium.a#.'
            ],
            rules: {

            }
        },
        transitionVerbs: ['hear'],
        transitions: [
            {
                to: ['song'],
                grammar: {
                    origin: [
                        'The song mentions #newMedium.a#.'
                    ],
                    rules: {}
            }
            },
            {
                to: ['movie', 'tv', 'videogame', 'album', 'painting', 'statue', 'book', 'comic book'],
                grammar: {
                    origin: [
                        'The singer mentions #newMedium.a#.'
                    ],
                    rules: {

                    }
            }
            }
        ]
    },
    {
        key: 'album',
        name: 'album',
        type: MEDIUM_TYPE.MUSIC,
        defaultWeight: 50,
        hasGenre: true,
        genres: MUSIC_GENRES,
        intro: {
            origin: [
                'You are listening to #newMedium.a#.'
            ],
            rules: {

            }
        },
        transitionVerbs: ['hear'],
        transitions: [
            {
                to: ['album'],
                grammar: {
                    origin: [
                        'There are references to another'
                    ],
                    rules: {}
            }
            },
            {
                to: ['movie', 'tv', 'videogame', 'song', 'painting', 'statue', 'book', 'comic book'],
                grammar: {
                    origin: [
                        'In one of the songs, the signer sings about #newMedium.a#.'
                    ],
                    rules: {}
            }
            }
        ]
    },
    //
    // FINE ART
    //
    {
        key: 'painting',
        name: 'painting',
        type: MEDIUM_TYPE.FINE_ART,
        defaultWeight: 50,
        hasGenre: true,
        genres: [
        ],
        intro: {
            origin: [
                'There is #newMedium.a# on the wall.'
            ],
            rules: {

            }
        },
        transitionVerbs: ['see'],
        transitions: [
            {
                to: ['painting'],
                grammar: {
                    origin: [

                    ],
                    rules: {}
            }
            },
            {
                to: ['movie', 'tv', 'videogame', 'song', 'album', 'statue', 'book', 'comic book'],
                grammar: {
                    origin: [
                    
                    ],
                    rules: {}
            }
            }
        ]
    },
    {
        key: 'statue',
        name: 'statue',
        type: MEDIUM_TYPE.FINE_ART,
        defaultWeight: 50,
        hasGenre: true,
        genres: [
        ],
        intro: {
            origin: [
                'There is #newMedium.a# in the room.'
            ],
            rules: {

            }
        },
        transitionVerbs: ['see'],
        transitions: [
            {
                to: ['statue'],
                grammar: {
                    origin: [

                    ],
                    rules: {}
            }
            },
            {
                to: ['movie', 'tv', 'videogame', 'song', 'album', 'painting', 'book', 'comic book'],
                grammar: {
                    origin: [
                    
                    ],
                    rules: {}
            }
            }
        ]
    },
    // 
    // LITERATURE
    //
    {
        key: 'book',
        name: 'novel',
        type: MEDIUM_TYPE.LITERATURE,
        defaultWeight: 50,
        hasGenre: true,
        genres: LITERATURE_GENRES,
        intro: {
            origin: [
                'You are reading #newMedium.a#.'
            ],
            rules: {

            }
        },
        transitionVerbs: ['see'],
        transitions: [
            {
                to: ['book'],
                grammar: {
                    origin: [

                    ],
                    rules: {}
            }
            },
            {
                to: ['movie', 'tv', 'videogame', 'song', 'album', 'painting', 'statue', 'comic book'],
                grammar: {
                    origin: [
                    
                    ],
                    rules: {}
            }
            }
        ]
    },
    {
        key: 'comic book',
        name: 'comic book',
        type: MEDIUM_TYPE.LITERATURE,
        defaultWeight: 50,
        hasGenre: false,
        genres: [
        ],
        intro: {
            origin: [
                'You are reading #newMedium.a#.'
            ],
            rules: {

            }
        },
        transitionVerbs: ['see'],
        transitions: [
            {
                to: ['comic book'],
                grammar: {
                    origin: [

                    ],
                    rules: {}
            }
            },
            {
                to: ['movie', 'tv', 'videogame', 'song', 'album', 'painting', 'statue', 'book'],
                grammar: {
                    origin: [
                    
                    ],
                    rules: {}
            }
            }
        ]
    },
    //
    // MASSMEDIA
    // 
    // TODO: Do we need this? 
    // {
    //     key: 'job ad',
    //     name: 'job ad',
    //     type: MEDIUM_TYPE.LITERATURE,
    //     defaultWeight: 50,
    //     hasGenre: true,
    //     genres: [
    //     ],
    //     transitionVerbs: ['see'],
    //     transitions: []
    // },
    //
    // MIND
    //
]

export const DB_MEDIA_QUALITIES: MediumQuality[] = [
    {
        key: 'old',
        name: 'old',
        modifiers: [],
        applicableMedia: ['*']
    },
    {
        key: 'new',
        name: 'new',
        modifiers: ['', 'relatively'],
        applicableMedia: ['*']
    },
    {
        key: 'famous',
        name: 'famous',
        modifiers: [],
        applicableMedia: ['*']
    },
    {
        key: 'infamous',
        name: 'infamous',
        modifiers: [],
        applicableMedia: ['*']
    },
    {
        key: 'b',
        name: 'b',
        modifiers: [],
        applicableMedia: ['movie']
    },    
    {
        key: 'acclaimed',
        name: 'acclaimed',
        modifiers: ['universally', 'critically'],
        applicableMedia: ['*']
    },
    {
        key: 'controversial',
        name: 'controversial',
        modifiers: [],
        applicableMedia: ['*']
    },
    {
        key: 'well-known',
        name: 'well-known',
        modifiers: [],
        applicableMedia: ['*']
    },
    {
        key: 'popular',
        name: 'popular',
        modifiers: [],
        applicableMedia: ['*']
    }
]