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
    {key: 'highbrow', name: 'highbrow'},
    {key: 'comic', name: 'comic'}
]

const PAINTING_GENRES = [
    {key: 'historical', name: 'historical'},
    {key: 'portrait', name: 'portrait'},
    {key: 'abstract', name: 'abstract'},
    {key: 'impressionist', name: 'impressionist'},
    {key: 'cubist', name: 'cubist'},
    {key: 'rennaisance', name: 'rennaisance'},
    {key: 'minimalist', name: 'minimalist'},
    {key: 'psychedelic', name: 'psychedelic'},
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
                to: ['tv', 'talkshow', 'book', 'song', 'album', 'painting', 'statue'],
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
                'It is about #characters# and #themes#.',
                'The movie is about #characters# and #themes#.',
                '#characters.capitalize#. #themes.capitalize#.',
                'The movie deals with #themes#.'
            ],
            rules: {

            }
        }
    },
    {
        key: 'tv',
        name: 'TV series',
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
                to: ['movie', 'talkshow', 'book', 'song', 'album', 'painting', 'statue'],
                grammar: {
                    origin: [
                        'The episode references #newMedium.a# at one point.'
                    ],
                    rules: {

                    }
            }
            }
        ],
        story: {
            origin: [
                'It is about #characters# and #themes#.',
                'The TV series is about #characters# and #themes#.',
                '#characters.capitalize#. #themes.capitalize#.',
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
                to: ['movie', 'tv', 'song', 'album', 'painting', 'statue', 'book', 'talkshow'],
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
    // MUSIC
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
                to: ['movie', 'tv', 'album', 'painting', 'statue', 'book', 'talkshow'],
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
                'The singer sings about #themes#.',
                'The song is about #themes#.',
                "#themes.capitalize#. That's what the song is about."
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
                to: ['movie', 'tv', 'song', 'painting', 'statue', 'book', 'talkshow'],
                grammar: {
                    origin: [
                        'In one of the songs on the album,\n the singer sings about #newMedium.a#.'
                    ],
                    rules: {}
            }
            }
        ],
        story: {
            origin: [
                'The band sings about #themes#.',
                'The album is about #themes#.',
                "#themes.capitalize#. That's what the album is about."
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
                to: ['movie', 'tv', 'song', 'album', 'statue', 'book', 'talkshow'],
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
                'The painting depicts #characters#.',
                'You can see #characters# in the painting.'
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
                to: ['movie', 'tv', 'song', 'album', 'painting', 'book', 'talkshow'],
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
                'The statue depicts #characters#.',
                'It is supposed to depict #characters#.'
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
                to: ['movie', 'tv', 'song', 'album', 'painting', 'statue', 'talkshow'],
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
                'The book is about #characters# and #themes#.',
                'The book deals with #themes#.',
                'In the book, #characters# deal with #themes#.'
            ],
            rules: {
                
            }
        }
    }
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
    },
    {
        key: 'unknown',
        name: 'unknown',
        modifiers: ['mostly', ''],
        applicableMedia: ['*']
    }
]