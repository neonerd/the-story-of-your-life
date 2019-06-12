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
        transitionVerbs: ['see']
    },
    {
        key: 'tv',
        name: 'tv series',
        type: MEDIUM_TYPE.AV,
        defaultWeight: 50,
        hasGenre: true,
        genres: CINEMA_GENRES,
        transitionVerbs: ['see']
    },
    {
        key: 'talkshow',
        name: 'talkshow',
        type: MEDIUM_TYPE.AV,
        defaultWeight: 50,
        hasGenre: true,
        genres: [],
        transitionVerbs: ['see']
    },
    //
    // GAMES
    //
    {
        key: 'videogame',
        name: 'videogame',
        type: MEDIUM_TYPE.GAME,
        defaultWeight: 50,
        hasGenre: true,
        genres: [],
        transitionVerbs: ['see']
    },
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
        transitionVerbs: ['hear']
    },
    {
        key: 'album',
        name: 'album',
        type: MEDIUM_TYPE.MUSIC,
        defaultWeight: 50,
        hasGenre: true,
        genres: MUSIC_GENRES,
        transitionVerbs: ['hear']
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
        transitionVerbs: ['see']
    },
    {
        key: 'statue',
        name: 'statue',
        type: MEDIUM_TYPE.FINE_ART,
        defaultWeight: 50,
        hasGenre: true,
        genres: [
        ],
        transitionVerbs: ['see']
    },
    // 
    // LITERATURE
    //
    {
        key: 'book',
        name: 'book',
        type: MEDIUM_TYPE.LITERATURE,
        defaultWeight: 50,
        hasGenre: true,
        genres: [
        ],
        transitionVerbs: ['see']
    },
    {
        key: 'comic book',
        name: 'comic book',
        type: MEDIUM_TYPE.LITERATURE,
        defaultWeight: 50,
        hasGenre: true,
        genres: [
        ],
        transitionVerbs: ['see']
    },
    //
    // MASSMEDIA
    // 
    {
        key: 'job ad',
        name: 'job ad',
        type: MEDIUM_TYPE.LITERATURE,
        defaultWeight: 50,
        hasGenre: true,
        genres: [
        ],
        transitionVerbs: ['see']
    },
    //
    // MIND
    //
    {
        key: 'memory',
        name: 'memory',
        type: MEDIUM_TYPE.MIND,
        defaultWeight: 50,
        hasGenre: true,
        genres: [
        ],
        transitionVerbs: ['see']
    },
    {
        key: 'imagination',
        name: 'imagination',
        type: MEDIUM_TYPE.MIND,
        defaultWeight: 50,
        hasGenre: true,
        genres: [
        ],
        transitionVerbs: ['see']
    },
    {
        key: 'dream',
        name: 'dream',
        type: MEDIUM_TYPE.MIND,
        defaultWeight: 50,
        hasGenre: true,
        genres: [
        ],
        transitionVerbs: ['see']
    }
]

export const DB_MEDIA_TRANSITIONS: MediumTransition[] = [
    
]

export const DB_MEDIA_QUALITIES: MediumQuality[] = [
    {
        key: 'old',
        name: 'old',
        modifiers: []
    },
    {
        key: 'famous',
        name: 'famous',
        modifiers: []
    },
    {
        key: 'b',
        name: 'b',
        modifiers: []
    },
    {
        key: 'new',
        name: 'new',
        modifiers: ['', 'relatively']
    },
    {
        key: 'acclaimed',
        name: 'acclaimed',
        modifiers: []
    },
    {
        key: 'controversial',
        name: 'controversial',
        modifiers: []
    }
]