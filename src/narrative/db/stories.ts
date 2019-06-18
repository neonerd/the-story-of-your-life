import {StoryTheme, StoryQuality, StoryCharacter, StorySituation} from '../engine'

export const DB_STORY_THEMES: StoryTheme[] = [
    {
        key: 'love',
        name: 'love',
        modifiers: ['unrequited', 'motherly', 'fatherly', 'friendly', 'tragic', 'pragmatic', 'forbidden', 'long-distance'],
        stillTags: ['love']
    },
    {
        key: 'hate',
        name: 'hate',
        modifiers: [],
        stillTags: ['man', 'woman']
    },
    {
        key: 'friendship',
        name: 'friendship',
        modifiers: ['failing', 'great', ''],
        stillTags: ['childhood', 'youth']
    },
    {
        key: 'struggle',
        name: 'struggle',
        modifiers: ['evil', 'corporations', 'system'],
        stillTags: ['history']
    },
    {
        key: 'betrayal',
        name: 'betrayal',
        modifiers: [],
        stillTags: []
    },
    {
        key: 'grief',
        name: 'grief',
        modifiers: [],
        stillTags: []
    },
    {
        key: 'failure',
        name: 'failure',
        modifiers: [],
        stillTags: []
    },
    {
        key: 'journey',
        name: 'journey',
        modifiers: ['great', 'small', 'important', ''],
        stillTags: ['scenery']
    },
    {
        key: 'youth',
        name: 'youth',
        modifiers: ['lost', 'reclaimed', 'boring'],
        stillTags: ['youth']
    },
    {
        key: 'summer',
        name: 'summer',
        modifiers: [],
        stillTags: ['scenery', 'youth']
    },
    {
        key: 'hope',
        name: 'hope',
        modifiers: [],
        stillTags: ['scenery', 'youth']
    },
    {
        key: 'family',
        name: 'family',
        modifiers: [],
        stillTags: ['childhood']
    },
    {
        key: 'growing up',
        name: 'growing up',
        modifiers: [],
        stillTags: ['childhood', 'youth']
    },
    {
        key: 'adventure',
        name: 'adventure',
        modifiers: [],
        stillTags: ['scenery']
    },
    {
        key: 'sadness',
        name: 'sadness',
        modifiers: [],
        stillTags: []
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
    

    // TODO: Do we want to use negative qualities at all?
    // {key: 'arrogant', name: 'arrogant', modifiers: []},
    // {key: 'average', name: 'average', modifiers: []},
    // {key: 'banal', name: 'banal', modifiers: []},
    // {key: 'boring', name: 'boring', modifiers: []},
    // {key: 'childish', name: 'childish', modifiers: []},
    // {key: 'confusing', name: 'confusing', modifiers: []},
    // {key: 'contrived', name: 'contrived', modifiers: []},
    // {key: 'crude', name: 'crude', modifiers: []},
    // {key: 'devoid of skill', name: 'devoid of skill', modifiers: []},
    // {key: 'disturbing', name: 'disturbing', modifiers: []},
    // {key: 'drab', name: 'drab', modifiers: []},
    // {key: 'dull', name: 'dull', modifiers: []},
    // {key: 'lifeless', name: 'lifeless', modifiers: []},
    // {key: 'mediocre', name: 'mediocre', modifiers: []},
    // {key: 'numb', name: 'numb', modifiers: []},
    // {key: 'plain', name: 'plain', modifiers: []},
    // {key: 'poorly-conceived', name: 'poorly-conceived', modifiers: []},
    // {key: 'poorly-executed', name: 'poorly-executed', modifiers: []},
    // {key: 'predictable', name: 'predictable', modifiers: []},
    // {key: 'pretentious', name: 'pretentious', modifiers: []},
    // {key: 'redundant', name: 'redundant', modifiers: []},
    // {key: 'self-absorbed', name: 'self-absorbed', modifiers: []},
    // {key: 'senseless', name: 'senseless', modifiers: []},
    // {key: 'stereotyped', name: 'stereotyped', modifiers: []},
    // {key: 'sterile', name: 'sterile', modifiers: []},
    // {key: 'stiff', name: 'stiff', modifiers: []},
    // {key: 'flat', name: 'flat', modifiers: []},
    // {key: 'forced', name: 'forced', modifiers: []},
    // {key: 'frantic', name: 'frantic', modifiers: []},
    // {key: 'frigid', name: 'frigid', modifiers: []},
    // {key: 'gimmicky', name: 'gimmicky', modifiers: []},
    // {key: 'hollow', name: 'hollow', modifiers: []},
    // {key: 'incompetent', name: 'incompetent', modifiers: []},
    // {key: 'inconsistent', name: 'inconsistent', modifiers: []},
    // {key: 'inexperienced', name: 'inexperienced', modifiers: []},
    // {key: 'insincere', name: 'insincere', modifiers: []},
    // {key: 'juvenile', name: 'juvenile', modifiers: []},
    // {key: 'tasteless', name: 'tasteless', modifiers: []},
    // {key: 'unaffecting', name: 'unaffecting', modifiers: []},
    // {key: 'unapproachable', name: 'unapproachable', modifiers: []},
    // {key: 'underwhelming', name: 'underwhelming', modifiers: []},
    // {key: 'unfinished', name: 'unfinished', modifiers: []},
    // {key: 'unimaginative', name: 'unimaginative', modifiers: []},
    // {key: 'unimportant', name: 'unimportant', modifiers: []},
    // {key: 'uninspired', name: 'uninspired', modifiers: []},
    // {key: 'uninteresting', name: 'uninteresting', modifiers: []},
    // {key: 'unoriginal', name: 'unoriginal', modifiers: []},
    // {key: 'unrefined', name: 'unrefined', modifiers: []},
    // {key: 'unsatisfying', name: 'unsatisfying', modifiers: []},
    // {key: 'untalented', name: 'untalented', modifiers: []},
    // {key: 'vacuous', name: 'vacuous', modifiers: []},
    // {key: 'void', name: 'void', modifiers: []},


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
        name: 'couple',
        modifiers: [],
        stillTags: ['love']
    },
    {
        key: 'man',
        name: 'man',
        modifiers: DB_STORY_CHARACTER_HUMAN_MODIFIERS,
        stillTags: ['man']
    },
    {
        key: 'woman',
        name: 'woman',
        modifiers: DB_STORY_CHARACTER_HUMAN_MODIFIERS,
        stillTags: ['woman']
    },
    {
        key: 'child',
        name: 'child',
        modifiers: [],
        stillTags: ['childhood']
    },
    {
        key: 'friends',
        name: 'friends',
        modifiers: [],
        isPlural: true,
        stillTags: ['youth','man','woman']
    },
    {
        key: 'famous person',
        name: 'famous person',
        modifiers: [],
        stillTags: ['history']
    },
    {
        key: 'soldier',
        name: 'soldier',
        modifiers: DB_STORY_CHARACTER_HUMAN_MODIFIERS,
        stillTags: ['history', 'man', 'woman']
    },
    {
        key: 'businessman',
        name: 'businessman',
        modifiers: DB_STORY_CHARACTER_HUMAN_MODIFIERS,
        stillTags: ['man', 'woman']
    },
    {
        key: 'businessmen',
        name: 'businessmen',
        modifiers: [],
        isPlural: true,
        stillTags: ['man', 'woman']
    },
    {
        key: 'hero',
        name: 'hero',
        modifiers: DB_STORY_CHARACTER_HUMAN_MODIFIERS,
        stillTags: ['man', 'woman']
    },
    {
        key: 'teacher',
        name: 'teacher',
        modifiers: DB_STORY_CHARACTER_HUMAN_MODIFIERS,
        stillTags: ['man','woman']
    },
    {
        key: 'attorney',
        name: 'attorney',
        modifiers: DB_STORY_CHARACTER_HUMAN_MODIFIERS,
        stillTags: ['man', 'woman']
    }
]