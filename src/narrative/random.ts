/**
 * This file contains the random generation functions for the work.
 */

import * as seedrandom from 'seedrandom'

export class RandomGenerator {
    rng: seedrandom.prng

    constructor (seed) {
        this.rng = seedrandom(seed)
    }

    weighted (weights: number[]): number {
        var totalWeight = 0,
            i, random;
    
        for (i = 0; i < weights.length; i++) {
            totalWeight += weights[i];
        }
    
        random = this.rng() * totalWeight;
    
        for (i = 0; i < weights.length; i++) {
            if (random < weights[i]) {
                return i;
            }
    
            random -= weights[i];
        }
    
        return -1;
    }
}