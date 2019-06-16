import { Thought, ThoughtSubject } from "../engine";


export const DB_THOUGHTS: Thought[] = [
    {
        key: 'memory',
        introductoryGrammar: {
            origin: [],
            rules: {

            }
        }
    },
    {
        key: 'imagination',
        introductoryGrammar: {
            origin: [],
            rules: {
                
            }
        }
    }
]

export const DB_THOUGHT_SUBJECT: ThoughtSubject[] = [
    {
        key: 'school',
        plainGrammar: {
            origin: [
                'the times in high school',
                'the times in elementary school',
                'the times in university'
            ],
            rules: {
                
            }
        },
        uncertainGrammar: {
            origin: [],
            rules: {
                
            }
        },
        radicalGrammar: {
            origin: [],
            rules: {
                
            }
        }        
    },
    {
        key: 'trip',
        plainGrammar: {
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
        uncertainGrammar: {
            origin: [],
            rules: {
                
            }
        },
        radicalGrammar: {
            origin: [],
            rules: {
                
            }
        }    
    },
    {
        key: 'love',
        plainGrammar: {
            origin: [
                'the #time# you were in love',
                'your first #quality# love'
            ],
            rules: {
                time: ['second', 'first', 'last', 'third'],
                quality: ['real', 'unfulfilled', 'fulfilled']
            }
        },
        uncertainGrammar: {
            origin: [],
            rules: {
                
            }
        },
        radicalGrammar: {
            origin: [],
            rules: {
                
            }
        }    
    },
    {
        key: 'politics',
        plainGrammar: {
            origin: [

            ],
            rules: {
                
            }
        },
        uncertainGrammar: {
            origin: [],
            rules: {
                
            }
        },
        radicalGrammar: {
            origin: [],
            rules: {
                
            }
        }  
    },
    {
        key: 'fun',
        plainGrammar: {
            origin: [
                'the #time# you were in love',
                'your first #quality# love'
            ],
            rules: {
                time: ['second', 'first', 'last', 'third'],
                quality: ['real', 'unfulfilled', 'fulfilled']
            }
        },
        uncertainGrammar: {
            origin: [],
            rules: {
                
            }
        },
        radicalGrammar: {
            origin: [],
            rules: {
                
            }
        }    
    }
]

export const DB_THOUGHT_QUALITY = []

export const DB_THOUGHT_REASONS = []