import * as narrative from './index'
import { RandomGenerator } from './random';

const rng = new RandomGenerator(Math.random())

console.log('=== NARRATIVE SEQUENCE\n')
const sequence = narrative.generateNarrativeSequence(rng)

// ===
// === EXAMPLE OF A WHOLE NARRATIVE SEQUENCE
// ===

const n = async () => {

console.log('\n')
console.log(narrative.getExcerciseName(sequence, rng))

// === Create the intro
console.log('\n')
console.log(`Imagine you are ${narrative.describeNarrativeLocation(sequence, rng)}. ${narrative.introduceNarrativeCharacter(sequence, rng)}.`)
// === Create ambience
console.log('\n')
console.log(narrative.describeAmbience(sequence, rng))
// Get the still
let still = await narrative.getStillForNarrativeSequence(sequence)
console.log('\nStill: ')

// === Create the first media intro
// We should loop until we find the next narrativeUnit without parent
console.log('\n')
console.log(narrative.generateMediumIntro(sequence.units[0], rng))
console.log(narrative.describeStory(sequence.units[0], rng))
console.log(narrative.describeStoryQuality(sequence.units[0], rng))
// Get the still
still = await narrative.getStillForNarrativeUnit(sequence.units[0])
console.log('\nStill: ')

// === Create the nesting
console.log('\n')
console.log(narrative.generateMediumNesting(sequence.units[1], sequence.units[0], rng))
console.log(narrative.describeStory(sequence.units[1], rng))
console.log(narrative.describeStoryQuality(sequence.units[1], rng))
still = await narrative.getStillForNarrativeUnit(sequence.units[1])
console.log('\nStill: ')

// === Positive Thought
console.log('\n')
console.log(sequence.thought.positiveGrammarResult)
console.log(sequence.thought.positiveQualityResult)
still = await narrative.getStillForThought(sequence.thought)
console.log('\nStill: ')

// === Time passage
console.log('\n')
console.log(narrative.describeTimePassage(rng))

// === Create the second intro
console.log('\n')
console.log(`Imagine you are ${narrative.describeNarrativeLocation(sequence, rng)}. ${narrative.removeNarrativeCharacter(sequence, rng)}.`)

// === Create second ambience
console.log('\n')
console.log(narrative.describeAmbience(sequence, rng))
still = await narrative.getStillForNarrativeSequence(sequence)
console.log('\nStill: ')

// Media
console.log('\n')
console.log(narrative.generateMediumIntro(sequence.units[2], rng))
console.log(narrative.describeStory(sequence.units[2], rng))
console.log(narrative.describeStoryQuality(sequence.units[2], rng))
still = await narrative.getStillForNarrativeUnit(sequence.units[2])
console.log('\nStill: ')

// === Create the nesting
console.log('\n')
console.log(narrative.generateMediumNesting(sequence.units[3], sequence.units[2], rng))
console.log(narrative.describeStory(sequence.units[3], rng))
console.log(narrative.describeStoryQuality(sequence.units[3], rng))
still = await narrative.getStillForNarrativeUnit(sequence.units[3])
console.log('\nStill: ')

// == Negative Thought
console.log('\n')
console.log(sequence.thought.negativeGrammarResult)
console.log(sequence.thought.negativeQualityResult)
still = await narrative.getStillForThought(sequence.thought)
console.log('\nStill: ')

// == Reasoning
console.log('\n')
console.log(sequence.thought.reasonResult)

// == End
console.log('\n')
console.log(narrative.describeMovingOn(rng).join('\n'))
still = await narrative.getStillForMovingOn()
console.log('\nStill: ')



}
n()







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