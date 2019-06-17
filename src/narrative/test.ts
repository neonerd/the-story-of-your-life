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


// ===
// === EXAMPLE OF A WHOLE NARRATIVE SEQUENCE
// ===

// === Create the intro
console.log('\n')
console.log(`Imagine you are ${narrative.describeNarrativeLocation(sequence, rng)}. ${narrative.introduceNarrativeCharacter(sequence, rng)}.`)

// === Create ambience
console.log('\n')
console.log(narrative.describeAmbience(sequence, rng))

// === Create the first media intro
// We should loop until we find the next narrativeUnit without parent
console.log('\n')
console.log(narrative.generateMediumIntro(sequence.units[0], rng))
console.log(narrative.describeStory(sequence.units[0], rng))
console.log(narrative.describeStoryQuality(sequence.units[0], rng))

// === Create the nesting
console.log('\n')
console.log(narrative.generateMediumNesting(sequence.units[1], sequence.units[0], rng))
console.log(narrative.describeStory(sequence.units[1], rng))
console.log(narrative.describeStoryQuality(sequence.units[1], rng))

// === Positive Thought
console.log('\n')
console.log(sequence.thought.positiveGrammarResult)
console.log(sequence.thought.positiveQualityResult)

// === Time passage
console.log('\n')
console.log(narrative.describeTimePassage(rng))

// === Create the second intro
console.log('\n')
console.log(`Imagine you are ${narrative.describeNarrativeLocation(sequence, rng)}. ${narrative.removeNarrativeCharacter(sequence, rng)}.`)

// === Create second ambience
console.log('\n')
console.log(narrative.describeAmbience(sequence, rng))

// Media
console.log('\n')
console.log(narrative.generateMediumIntro(sequence.units[2], rng))
console.log(narrative.describeStory(sequence.units[2], rng))
console.log(narrative.describeStoryQuality(sequence.units[2], rng))

// === Create the nesting
console.log('\n')
console.log(narrative.generateMediumNesting(sequence.units[3], sequence.units[2], rng))
console.log(narrative.describeStory(sequence.units[3], rng))
console.log(narrative.describeStoryQuality(sequence.units[3], rng))

// == Negative Thought
console.log('\n')
console.log(sequence.thought.negativeGrammarResult)
console.log(sequence.thought.negativeQualityResult)

// == Reasoning
console.log('\n')
console.log(sequence.thought.reasonResult)

// == End
console.log('\n')
console.log(narrative.describeMovingOn(rng).join('\n'))










//
// UNITS DEBUG
//
// // Get the units
// const units = sequence.units
// units.map((u, idx) => {
//     console.log('\n')
//     console.log('UNIT #' + (idx+1))
//     console.log(u.type)
//     console.log(`Medium: ${u.mediumInstance.medium.name}`)
//     console.log(`Genre: ${u.mediumInstance.mediumGenre}`)
//     console.log(`Story: ${u.mediumInstance.story}`)
//     console.log(`Qualities: ${u.mediumInstance.qualities}`)
// })