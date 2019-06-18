import { RandomGenerator } from "./random";
import {range} from 'ramda'

const rng = new RandomGenerator(Math.random())

const WEIGHTS = [75, 15, 10]

const results = []

range(0, 10000).map(i => {
    results.push(rng.weighted(WEIGHTS))
})

const resultsMap = {
    0: 0,
    1: 0,
    2: 0
}

results.map(result => {
    resultsMap[result]++
})

console.log('resultsMap', resultsMap)