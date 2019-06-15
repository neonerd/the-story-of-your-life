import {StoryTheme, StoryQuality, StoryCharacter, StorySituation} from '../engine'

export const DB_STORY_THEMES: StoryTheme[] = [
    {
        key: 'love',
        name: ['love', 'romance'],
        modifiers: ['unrequited', 'motherly', 'fatherly', 'friendly', 'tragic', 'pragmatic', 'forbidden', 'long-distance']
    },
    {
        key: 'hate',
        name: 'hate',
        modifiers: []
    },
    {
        key: 'friendship',
        name: 'friendship',
        modifiers: ['failing', 'great', '']
    },
    {
        key: 'struggle',
        name: 'struggle',
        modifiers: ['evil', 'corporations', 'system']
    },
    {
        key: 'betrayal',
        name: 'betrayal',
        modifiers: []
    },
    {
        key: 'grief',
        name: 'grief',
        modifiers: []
    },
    {
        key: 'failure',
        name: 'failure',
        modifiers: []
    },
    {
        key: 'journey',
        name: 'journey',
        modifiers: ['great', 'small', 'important', '']
    },
    {
        key: 'youth',
        name: 'youth',
        modifiers: ['lost', 'reclaimed', 'boring']
    },
    {
        key: 'summer',
        name: 'summer',
        modifiers: []
    },
    {
        key: 'hope',
        name: 'hope',
        modifiers: []
    },
    {
        key: 'family',
        name: 'family',
        modifiers: []
    },
    {
        key: 'growing up',
        name: 'growing up',
        modifiers: []
    },
    {
        key: 'adventure',
        name: 'adventure',
        modifiers: []
    }
]

export const DB_STORY_SITUATIONS: StorySituation[] = [
    {
        key: 'looking at',
        grammar: {
            origin: [
                'looking at #object#'
            ],
            rules: {
                object: [
                    'sunset',
                    'sea',
                    'ocean',
                    'horizon'
                ]
            }
        }
    },
    {
        key: 'discussing',
        grammar: {
            origin: [
                '#p# discussing #s#'
            ],
            rules: {
                p: ['angrily', 'passionately', 'calmly', ''],
                s: ['life', 'politics', 'society', 'love', 'sex', 'happiness', 'purpose']
            }
        }
    }
]

export const DB_STORY_QUALITIES: StoryQuality[] = [
    {
        key: 'sad',
        name: 'sad',
        modifiers: []
    },
    {
        key: 'depressive',
        name: 'depressive',
        modifiers: []
    },
    {
        key: 'uplifting',
        name: 'uplifting',
        modifiers: []
    },
    {
        key: 'happy',
        name: 'happy',
        modifiers: []
    },
    {
        key: 'political',
        name: 'political',
        modifiers: []
    },
    {
        key: 'angry',
        name: 'angry',
        modifiers: []
    },
    {
        key: 'complex',
        name: 'complex',
        modifiers: []
    },
    {
        key: 'complicated',
        name: 'complicated',
        modifiers: []
    },
    {
        key: 'absorbing',
        name: 'absorbing',
        modifiers: []
    },
    {
        key: 'deeply thoughtful',
        name: 'deeply thoughtful',
        modifiers: []
    },
    {
        key: 'dreamlike',
        name: 'dreamlike',
        modifiers: []
    },
    {
        key: 'dreamy',
        name: 'dreamy',
        modifiers: []
    },
    {
        key: 'emotional',
        name: 'emotional',
        modifiers: []
    },
    {
        key: 'energetic',
        name: 'energetic',
        modifiers: []
    },
    {
        key: 'engrossing',
        name: 'engrossing',
        modifiers: []
    },
    {
        key: 'enigmatic',
        name: 'enigmatic',
        modifiers: []
    },
    {
        key: 'ethereal',
        name: 'ethereal',
        modifiers: []
    },
    {
        key: 'evocative',
        name: 'evocative',
        modifiers: []
    },
    {
        key: 'exotic',
        name: 'exotic',
        modifiers: []
    },
    {
        key: 'extreme',
        name: 'extreme',
        modifiers: []
    },
    {
        key: 'expressive',
        name: 'expressive',
        modifiers: []
    },
    {
        key: 'honest',
        name: 'honest',
        modifiers: []
    },
    {
        key: 'imaginative',
        name: 'imaginative',
        modifiers: []
    },
    {
        key: 'inspirational',
        name: 'inspirational',
        modifiers: []
    },
    {
        key: 'intellectual',
        name: 'intellectual',
        modifiers: []
    },
    {
        key: 'layered',
        name: 'layered',
        modifiers: []
    },
    {
        key: 'lifelike',
        name: 'lifelike',
        modifiers: []
    },
    {
        key: 'lyrical',
        name: 'lyrical',
        modifiers: []
    },
    {
        key: 'mature',
        name: 'mature',
        modifiers: []
    },
    {
        key: 'mysterious',
        name: 'mysterious',
        modifiers: []
    },
    {
        key: 'mystical',
        name: 'mystical',
        modifiers: []
    },
    {
        key: 'organic',
        name: 'organic',
        modifiers: []
    },
    {
        key: 'original',
        name: 'original',
        modifiers: []
    },
    {
        key: 'playful',
        name: 'playful',
        modifiers: []
    },
    {
        key: 'profound',
        name: 'profound',
        modifiers: []
    },
    {
        key: 'provoking',
        name: 'provoking',
        modifiers: []
    },
    {
        key: 'pure',
        name: 'pure',
        modifiers: []
    },
    {
        key: 'realistic',
        name: 'realistic',
        modifiers: []
    },
    {
        key: 'refined',
        name: 'refined',
        modifiers: []
    },
    {
        key: 'revealing',
        name: 'revealing',
        modifiers: []
    },
    {
        key: 'rich',
        name: 'rich',
        modifiers: []
    },
    {
        key: 'romantic',
        name: 'romantic',
        modifiers: []
    },
    {
        key: 'sensual',
        name: 'sensual',
        modifiers: []
    },
    {
        key: 'serene',
        name: 'serene',
        modifiers: []
    },
    {
        key: 'simple',
        name: 'simple',
        modifiers: []
    },
    {
        key: 'sparse',
        name: 'sparse',
        modifiers: []
    },
    {
        key: 'stunning',
        name: 'stunning',
        modifiers: []
    },
    {
        key: 'sublime',
        name: 'sublime',
        modifiers: []
    },
    {
        key: 'symbolic',
        name: 'symbolic',
        modifiers: []
    },
    {
        key: 'surreal',
        name: 'surreal',
        modifiers: []
    },
    {
        key: 'tasteful',
        name: 'tasteful',
        modifiers: []
    },
    {
        key: 'thought-provoking',
        name: 'thought-provoking',
        modifiers: []
    },
    {
        key: 'touching',
        name: 'touching',
        modifiers: []
    },
    {
        key: 'timeless',
        name: 'timeless',
        modifiers: []
    },
    {
        key: 'unconventional',
        name: 'unconventional',
        modifiers: []
    },
    {
        key: 'unforgettable',
        name: 'unforgettable',
        modifiers: []
    },
    {
        key: 'unpredictable',
        name: 'unpredictable',
        modifiers: []
    },
    {
        key: 'visionary',
        name: 'visionary',
        modifiers: []
    },
    

    {key: 'arrogant', name: 'arrogant', modifiers: []},
    {key: 'average', name: 'average', modifiers: []},
    {key: 'banal', name: 'banal', modifiers: []},
    {key: 'boring', name: 'boring', modifiers: []},
    {key: 'childish', name: 'childish', modifiers: []},
    {key: 'confusing', name: 'confusing', modifiers: []},
    {key: 'contrived', name: 'contrived', modifiers: []},
    {key: 'crude', name: 'crude', modifiers: []},
    {key: 'devoid of skill', name: 'devoid of skill', modifiers: []},
    {key: 'disturbing', name: 'disturbing', modifiers: []},
    {key: 'drab', name: 'drab', modifiers: []},
    {key: 'dull', name: 'dull', modifiers: []},
    {key: 'lifeless', name: 'lifeless', modifiers: []},
    {key: 'mediocre', name: 'mediocre', modifiers: []},
    {key: 'numb', name: 'numb', modifiers: []},
    {key: 'plain', name: 'plain', modifiers: []},
    {key: 'poorly-conceived', name: 'poorly-conceived', modifiers: []},
    {key: 'poorly-executed', name: 'poorly-executed', modifiers: []},
    {key: 'predictable', name: 'predictable', modifiers: []},
    {key: 'pretentious', name: 'pretentious', modifiers: []},
    {key: 'redundant', name: 'redundant', modifiers: []},
    {key: 'self-absorbed', name: 'self-absorbed', modifiers: []},
    {key: 'senseless', name: 'senseless', modifiers: []},
    {key: 'stereotyped', name: 'stereotyped', modifiers: []},
    {key: 'sterile', name: 'sterile', modifiers: []},
    {key: 'stiff', name: 'stiff', modifiers: []},
    {key: 'flat', name: 'flat', modifiers: []},
    {key: 'forced', name: 'forced', modifiers: []},
    {key: 'frantic', name: 'frantic', modifiers: []},
    {key: 'frigid', name: 'frigid', modifiers: []},
    {key: 'gimmicky', name: 'gimmicky', modifiers: []},
    {key: 'hollow', name: 'hollow', modifiers: []},
    {key: 'incompetent', name: 'incompetent', modifiers: []},
    {key: 'inconsistent', name: 'inconsistent', modifiers: []},
    {key: 'inexperienced', name: 'inexperienced', modifiers: []},
    {key: 'insincere', name: 'insincere', modifiers: []},
    {key: 'juvenile', name: 'juvenile', modifiers: []},
    {key: 'tasteless', name: 'tasteless', modifiers: []},
    {key: 'unaffecting', name: 'unaffecting', modifiers: []},
    {key: 'unapproachable', name: 'unapproachable', modifiers: []},
    {key: 'underwhelming', name: 'underwhelming', modifiers: []},
    {key: 'unfinished', name: 'unfinished', modifiers: []},
    {key: 'unimaginative', name: 'unimaginative', modifiers: []},
    {key: 'unimportant', name: 'unimportant', modifiers: []},
    {key: 'uninspired', name: 'uninspired', modifiers: []},
    {key: 'uninteresting', name: 'uninteresting', modifiers: []},
    {key: 'unoriginal', name: 'unoriginal', modifiers: []},
    {key: 'unrefined', name: 'unrefined', modifiers: []},
    {key: 'unsatisfying', name: 'unsatisfying', modifiers: []},
    {key: 'untalented', name: 'untalented', modifiers: []},
    {key: 'vacuous', name: 'vacuous', modifiers: []},
    {key: 'void', name: 'void', modifiers: []},


]

const DB_STORY_CHARACTER_HUMAN_MODIFIERS = [
    'aging',
    'old',
    'young',
    'brave',
    'introverted',
    'shy',
    'silent',
    'strong',
    'outgoing',
    'intelligent'
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
        modifiers: [],
        isPlural: true
    },
    {
        key: 'famous person',
        name: '',
        modifiers: []
    },
    {
        key: 'soldier',
        name: 'soldier',
        modifiers: []
    },
    {
        key: 'businessman',
        name: 'businessman',
        modifiers: []
    },
    {
        key: 'businessmen',
        name: 'businessmen',
        modifiers: [],
        isPlural: true
    },
    {
        key: 'hero',
        name: 'hero',
        modifiers: []
    },
    {
        key: 'teacher',
        name: 'teacher',
        modifiers: []
    },
    {
        key: 'girl',
        name: 'girl',
        modifiers: []
    },
    {
        key: 'boy',
        name: 'boy',
        modifiers: []
    },
    {
        key: 'attorney',
        name: 'attorney',
        modifiers: []
    }
]