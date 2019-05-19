import * as weightedRandom from 'weighted-random'
import {range, clone} from 'ramda'

export function getRandomValueFromArray (items) {
    return clone(items[Math.floor(Math.random()*items.length)])
}