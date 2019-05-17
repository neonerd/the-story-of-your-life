interface NarrativeSequence {
    units: NarrativeUnit[]
}

interface NarrativeUnit {
    id: number
    previousUnitId?: number
}


enum MEDIUM_TYPE {
    AV,
    MUSIC,
    FINE_ART,
    LITERATURE,
    MASSMEDIA,
    MIND
}
interface Medium {
    key: string
    name: string
    type: MEDIUM_TYPE
}

interface Character {
    key: string
    name: string
}

interface Story {

}


const DB_MEDIA: Medium[] = [
    {
        key: 'movie',
        name: 'movie',
        type: MEDIUM_TYPE.AV
    },
    {
        key: 'song',
        name: 'song',
        type: MEDIUM_TYPE.MUSIC
    }
]


