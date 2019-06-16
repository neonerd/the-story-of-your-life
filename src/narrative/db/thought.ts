import { Thought, ThoughtSubject, ThoughtQuality, ThoughtReason } from "../engine";


export const DB_THOUGHTS: Thought[] = [
    {
        key: 'memory',
        introductoryGrammar: {
            origin: [
                'You remember'
            ],
            rules: {

            }
        }
    },
    {
        key: 'imagination',
        introductoryGrammar: {
            origin: [
                'You think of'
            ],
            rules: {
                
            }
        }
    }
]

export const DB_THOUGHT_SUBJECT: ThoughtSubject[] = [
    {
        key: 'school',
        positiveGrammar: {
            origin: [
                'the times in high school',
                'the times in elementary school',
                'the times in university'
            ],
            rules: {
                
            }
        },
        negativeGrammar: {
            origin: [
                'the times when you were not a student anymore'
            ],
            rules: {
            }
        },
     
    },
    {
        key: 'travel',
        positiveGrammar: {
            origin: [
                'the trip to #destination# you took with #partners#',
                'the summer when you #activity#'
            ],
            rules: {
                destination: ['the coast', 'the mountains'],
                partners: ['your friends', 'your love', 'your parents', 'your family', 'your class', 'your colleagues'],
                activity: ['travelled the country with #partners#', 'did not have to do anything']
            }
        },
        negativeGrammar: {
            origin: [
                'your other trips and adventures'
            ],
            rules: {
                
            }
        },
 
    },
    {
        key: 'love',
        positiveGrammar: {
            origin: [
                'the #time# you were in love',
                'your first #quality# love'
            ],
            rules: {
                time: ['second', 'first', 'last', 'third'],
                quality: ['real', '']
            }
        },
        negativeGrammar: {
            origin: [
                '#positiveGrammarResult# again. Was it ever the same?'
            ],
            rules: {
                
            }
        },
 
    },
    {
        key: 'politics',
        positiveGrammar: {
            origin: [
                'the #adjective# #position# that helped us move forward'
            ],
            rules: {
                adjective: [
                    'great'
                ],
                position: [
                    'presidents',
                    'prime ministers',
                    'politicians',
                    'leaders'
                ]
            }
        },
        negativeGrammar: {
            origin: [
                'how politics changed to worse.'
            ],
            rules: {
                
            }
        }
    },
    {
        key: 'childhood',
        positiveGrammar: {
            origin: [
                'the times when you were a little child'
            ],
            rules: {
            }
        },
        negativeGrammar: {
            origin: [
                'growing up and losing all that child\'s #adjective#'
            ],
            rules: {
                adjective: [
                    'curiosity',
                    'hope',
                    'wonder'
                ]
            }
        },
 
    },
    {
        key: 'youth',
        positiveGrammar: {
            origin: [
                'when you were young and free'
            ],
            rules: {
            }
        },
        negativeGrammar: {
            origin: [
                'getting older and youth slowly #verb#'
            ],
            rules: {
                verb: [
                    'fading away',
                    'disappearing'
                ]
            }
        },
 
    },
    {
        key: 'history',
        positiveGrammar: {
            origin: [
                'all the moments of great importance that happened',
                'when we achieved all those important historical milestones'
            ],
            rules: {

            }
        },
        negativeGrammar: {
            origin: [
                'how everything stopped making sense. Being significant. Historical.'
            ],
            rules: {
                
            }
        }
    }
]

// The positive and negative thoughts are in oposition and used in the same narrative sequence.
export const DB_THOUGHT_QUALITY: ThoughtQuality[] = [
    {
        key: 'happy',
        grammar: {
            origin: [
                'You were really #personalAdjective# back then.',
                'Those were #personalAdjective# times.',
                'The #thoughtType# #verb#. #thoughtSubject# is #thoughtAdjective#.'
            ],
            rules: {
                personalAdjective: [
                    'happy',
                    'beautiful',
                    'exciting',
                    'better',
                    'optimistic',
                    'cheerful',
                    'positive'
                ],
                verb: [
                    'warms you up',
                    'lightens you up'
                ],
                thoughtAdjective: [
                    'beautiful',
                    'engrossing',
                    'the best',
                    'dazzling',
                    'exquisite',
                    'lovely',
                    'pretty',
                    'splendid',
                    'stunning',
                    'superb'
                ]
            }
        }
    },
    {
        key: 'sad',
        isNegative: true,
        isNegativeTo: ['happy'],
        grammar: {
            origin: [
                'Things got sadder and sadder. So sad.',
                'Things only got worse.',
                'Things got sadder.'
            ],
            rules: {
                
            }
        }
    }
]

// The reason is only used at the end of the narrative sequence. Can we work with it before?
// The reasons should be ambivalent enough for the viewer to make his own ends
export const DB_THOUGHT_REASONS: ThoughtReason[] = [
    {
        key: 'race',
        grammar: {
            origin: [
                'Maybe we should have #stopVerb# them sooner. \n Maybe the world would be a #comparation# place without #raceSubject#.',
                'Maybe we should not have allowed them to visit #place#. Maybe we would be #better# without them.'
            ],
            rules: {
                raceSubject: [
                    'some sorts of people',
                    'that kind of people',
                    'some people'
                ],
                stopVerb: [
                    'stopped',
                ],
                comparation: [
                    'happier',
                    'better',
                    'simpler'
                ],
                better: [
                    'happier',
                    'better',
                    'completely fine'
                ],
                place: [
                    'the same schools and universities',
                    'the same cities',
                    'the same countries'
                ]
            }
        }
    },
    {
        key: 'politics',
        grammar: {
            origin: [
                ''
            ],
            rules: {

            }
        }
    },
    {
        key: 'time',
        grammar: {
            origin: [
                'Times have changed. Nothing is like it used to be.',
                'The old era is now long gone. Nothing is the same.'
            ],
            rules: {

            }
        }
    },
    {
        key: 'progress',
        grammar: {
            origin: [
                'That is the price we had to pay '
            ],
            rules: {

            }
        }
    },
    {
        key: 'values',
        grammar: {
            origin: [
                'It is unfortunate that we have slowly #lose# #value#.'
            ],
            rules: {
                value: [
                    'our values',
                    'the cornerstones of our society',
                    'the pillars of our society'
                ],
                lose: [
                    'abandoned',
                    'lost',
                    'forgot',
                    'thrown away'
                ]
            }
        }
    },
    {
        key: 'technology',
        grammar: {
            origin: [
                'Everything is different now. #technology# changed everything.'
            ],
            rules: {
                technology: [
                    'New technologies',
                    'Technological advancements',
                    'Technological progress'
                ]
            }
        }
    },
    {
        key: 'life',
        grammar: {
            origin: [
                'Life has changed. It is so #adjective# now.'
            ],
            rules: {
                adjective: [
                    'fast',
                    'complicated',
                    'complex',
                    'lonely',
                    'isolated',
                    'depressive',
                    'anxious',
                    'stressful'
                ]
            }
        }
    },
    {
        key: 'entertainment',
        grammar: {
            origin: [
                ''
            ],
            rules: {

            }
        }
    },
    {
        key: 'economy',
        grammar: {
            origin: [
                'Maybe '
            ],
            rules: {

            }
        }
    }
]