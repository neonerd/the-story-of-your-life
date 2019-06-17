/**
 * This file contains the random generation functions for the work.
 */

// Definitions
import { NarrativeGrammar } from './engine';

import {clone} from 'ramda'
import * as seedrandom from 'seedrandom'
import * as tracery from '../lib/tracery'

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
        tracery.setRng(this.rng)
    }

    randomItem (items: any[]) {
        return items[Math.floor(this.rng()*items.length)]
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

    /**
     * Expands the provided narrative grammar
     * @param g 
     */
    expandGrammar (g: NarrativeGrammar, injectRules?: any): string {
        let grammar = Object.assign({}, clone(g.rules), {
            origin: clone(g.origin)
        })        

        // If we have outside rules to inject, inject them into the grammar
        if (injectRules) {
            grammar = Object.assign(grammar, injectRules)
        }

        // Passed grammar is always expanded through origin
        const grammarDefinition = tracery.createGrammar(grammar)
        grammarDefinition.addModifiers(tracery.baseEngModifiers)
        return grammarDefinition.flatten('#origin#')
    }
}