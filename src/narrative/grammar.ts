const CONSONANTS = ''
const VOWELS = 'aeoui'.split('')

export function addIndefiniteArticle (str: string) {
    if (VOWELS.indexOf(str[0]) > -1) {
        return `an ${str}`
    } else {
        return `a ${str}`
    }
}