import { RandomGenerator } from "../../random";
import { generateMediumInstance, generateNarrativeUnitIntro, generateNarrativeUnit } from "../..";

const rng = new RandomGenerator(Math.random())
const nu = generateNarrativeUnit(rng)

console.log('=== GENERATING INTRO ===')
console.log(generateNarrativeUnitIntro(nu, rng))