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
    {key: 'action', name: 'action'},
    {key: 'drama', name: 'drama'},
    {key: 'comedy', name: 'comedy'},
    {key: 'detective', name: 'detective'},
    {key: 'noir', name: 'noir'},
    {key: 'romantic', name: 'romantic'},
    {key: 'scifi', name: 'scifi'},
    {key: 'historical', name: 'historical'},
    {key: 'fantasy', name: 'fantasy'},
    {key: 'thriller', name: 'thriller'}
]   

const LITERATURE_GENRES = [
    {key: 'crime', name: 'crime'},
    {key: 'paperback', name: 'paperback'},
    {key: 'hardcover', name: 'hardcover'},
    {key: 'fantasy', name: 'fantasy'},
    {key: 'historical', name: 'historical'},
    {key: 'scifi', name: 'scifi'},
    {key: 'detective', name: 'detective'},
    {key: 'romantic', name: 'romantic'},
    {key: 'highbrow', name: 'highbrow'}
]

const PAINTING_GENRES = [
    {key: 'historical', name: 'historical'},
    {key: 'portrait', name: 'portrait'},
    {key: 'abstract', name: 'abstract'},
    {key: 'impressionist', name: 'impressionist'},
    {key: 'cubist', name: 'cubist'},
    {key: 'rennaisance', name: 'rennaisance'},
    {key: 'minimalist', name: 'minimalist'},
    {key: 'nogenre', name: ''}
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
                        'You can see #newMedium.a# at one point in the movie.',
                        'The movie mentions #newMedium.a# at one point.'
                    ],
                    rules: {

                    }
                }
            }
        ],
        story: {
            origin: [
                'It is about #characters# and #themes#.'
            ],
            rules: {

            }
        }
    },
    {
        key: 'tv',
        name: 'tv series',
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
                        'The episode references another #newMedium.a# at one point.'
                    ],
                    rules: {

                    }
            }
            },
            {
                to: ['movie', 'talkshow', 'videogame', 'book', 'comic book', 'song', 'album', 'painting', 'statue'],
                grammar: {
                    origin: [
                        'The episode reference #newMedium.a# at one point.'
                    ],
                    rules: {

                    }
            }
            }
        ],
        story: {
            origin: [
                'It is about #characters# and #themes#.'
            ],
            rules: {
                
            }
        }
    },
    {
        key: 'talkshow',
        name: 'talkshow',
        type: MEDIUM_TYPE.AV,
        defaultWeight: 50,
        hasGenre: false,
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
                to: ['movie', 'tv', 'videogame', 'song', 'album', 'painting', 'statue', 'book', 'comic book', 'talkshow'],
                grammar: {
                    origin: [
                        'The talkshow host talks about #newMedium.a#.',
                        'One of the guests mentions #newMedium.a#.'
                    ],
                    rules: {

                    }
            }
            }
        ],
        story: {
            origin: [
                'It is an interview with #characters#.'
            ],
            rules: {
                
            }
        }
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
                        'The song mentions #newMedium.a#.',
                        'The singer mentions #newMedium.a# in the song.'
                    ],
                    rules: {}
            }
            },
            {
                to: ['movie', 'tv', 'videogame', 'album', 'painting', 'statue', 'book', 'comic book'],
                grammar: {
                    origin: [
                        'The singer mentions #newMedium.a# in the song.'
                    ],
                    rules: {

                    }
            }
            }
        ],
        story: {
            origin: [
                'The singer sings about #themes#.'
            ],
            rules: {
                
            }
        }
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
                        'There are references to another #newMedium.a#.'
                    ],
                    rules: {}
            }
            },
            {
                to: ['movie', 'tv', 'videogame', 'song', 'painting', 'statue', 'book', 'comic book'],
                grammar: {
                    origin: [
                        'In one of the songs on the album,\n the signer sings about #newMedium.a#.'
                    ],
                    rules: {}
            }
            }
        ],
        story: {
            origin: [
                'The band sings about #themes#.'
            ],
            rules: {
                
            }
        }
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
        genres: PAINTING_GENRES,
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
                        'You can spot #newMedium.a# in the painting.'
                    ],
                    rules: {}
            }
            },
            {
                to: ['movie', 'tv', 'videogame', 'song', 'album', 'statue', 'book', 'comic book'],
                grammar: {
                    origin: [
                        'You can spot #newMedium.a# in the painting.'
                    ],
                    rules: {}
            }
            }
        ],
        story: {
            origin: [
                'The painting depicts #characters#.'
            ],
            rules: {
                
            }
        }
    },
    {
        key: 'statue',
        name: 'statue',
        type: MEDIUM_TYPE.FINE_ART,
        defaultWeight: 50,
        hasGenre: false,
        genres: [
        ],
        intro: {
            origin: [
                'There is #newMedium.a# nearby.'
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
                        'The statue is based on another #newMedium#.'
                    ],
                    rules: {}
            }
            },
            {
                to: ['movie', 'tv', 'videogame', 'song', 'album', 'painting', 'book', 'comic book'],
                grammar: {
                    origin: [
                        'The statue references #newMedium.a#.'
                    ],
                    rules: {}
            }
            }
        ],
        story: {
            origin: [
                'The statue depicts #characters#.'
            ],
            rules: {
                
            }
        }
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
                        'The book is basically a retelling of #newMedium.a#.'
                    ],
                    rules: {}
            }
            },
            {
                to: ['movie', 'tv', 'videogame', 'song', 'album', 'painting', 'statue', 'comic book'],
                grammar: {
                    origin: [
                        'The book is basically a retelling of #newMedium.a#.',
                        '#newMedium.a.capitalize# is mentioned in the book.'
                    ],
                    rules: {}
            }
            }
        ],
        story: {
            origin: [
                'The book is about #characters# and #themes#.'
            ],
            rules: {
                
            }
        }
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
                        'The comic book is basically a retelling of #newMedium.a#.'
                    ],
                    rules: {

                    }
            }
            },
            {
                to: ['movie', 'tv', 'videogame', 'song', 'album', 'painting', 'statue', 'book'],
                grammar: {
                    origin: [
                        '#singleSubject.capitalize# references #newMedium.a# at one point.',

                    ],
                    rules: {
                        singleSubject: [
                            'the comic book',
                            'the story',
                            'the plot'
                        ]
                    }
            }
            }
        ],
        story: {
            origin: [
                'The comic book is about #characters# and #themes#.'
            ],
            rules: {
                
            }
        }
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
        modifiers: ['', 'very', 'really'],
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
        modifiers: ['', 'universally', 'critically'],
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