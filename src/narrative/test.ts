import * as narrative from './index'
import { RandomGenerator } from './random';

const rng = new RandomGenerator('test')

console.log('=== NARRATIVE SEQUENCE\n')
const sequence = narrative.generateNarrativeSequence(rng)

// Get the themes
sequence.themes.map(t => {
    console.log('Theme: ', t.name)
})

// Get the narrative characters
sequence.characters.map(c => {
    console.log('Character: ', c.name)
})

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