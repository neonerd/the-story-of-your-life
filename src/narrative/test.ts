import * as narrative from './index'

const units = narrative.generateNarrativeSequence().units


units.map((u, idx) => {
    console.log('\n')
    console.log('UNIT #' + (idx+1))
    console.log(u.type)
    console.log(`Medium: ${u.mediumInstance.medium.name}`)
    console.log(`Genre: ${u.mediumInstance.mediumGenre}`)
    console.log(`Story: ${u.mediumInstance.story}`)
    console.log(`Qualities: ${u.mediumInstance.qualities}`)
})