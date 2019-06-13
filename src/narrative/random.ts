/**
 * This file contains the random generation functions for the work.
 */

import * as seedrandom from 'seedrandom'

interface KeyFilterCacheKey {
    key: string
    numberOfTimesUsed: number
}

interface KeyFilterCacheNamespace {
    id: string
    keys: KeyFilterCacheKey[]
}

export class RandomGenerator {
    rng: seedrandom.prng
    keyFilterCache: KeyFilterCacheNamespace[]

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

    weightedWithFilter (id: string, options: any[], maxNumberOfUses: number) {
        
    }
}