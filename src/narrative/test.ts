import * as narrative from './index'
import { RandomGenerator } from './random';

const rng = new RandomGenerator('test')

console.log('=== NARRATIVE SEQUENCE\n')
const sequence = narrative.generateNarrativeSequence(rng)

// Get the themes
// Sequence doesn't need themes
// sequence.themes.map(t => {
//     console.log('Theme: ', t.name)
// })

// Get the location
console.log('Location: ', rng.expandGrammar(sequence.location.grammar))

// Get the narrative characters
sequence.characters.map(c => {
    console.log('Character: ', c.name)
})

// === Create the intro
console.log('\n')
console.log(`Imagine you are ${narrative.describeNarrativeLocation(sequence, rng)}. ${narrative.introduceNarrativeCharacter(sequence, rng)}.`)

// === Create ambience
console.log('\n')
console.log(narrative.describeAmbience(sequence, rng))

// Get the units
const units = sequence.units
units.map((u, idx) => {
    console.log('\n')
    console.log('UNIT #' + (idx+1))
    console.log(u.type)
    console.log(`Medium: ${u.mediumInstance.medium.name}`)
    console.log(`Genre: ${u.mediumInstance.mediumGenre}`)
    console.log(`Story: ${u.mediumInstance.story}`)
    console.log(`Qualities: ${u.mediumInstance.qualities}`)
})