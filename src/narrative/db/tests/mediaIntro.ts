import { RandomGenerator } from "../../random";
import { generateMediumInstance, generateMediumIntro, generateNarrativeUnit } from "../..";

const rng = new RandomGenerator(Math.random())
const nu = generateNarrativeUnit(rng)

console.log('=== GENERATING INTRO ===')
console.log(generateMediumIntro(nu, rng))