declare var Gibber: any
declare var Pizzicato: any

console.log('=== The Story of Your Life')

// Libs
import axios from 'axios'
import {range} from 'ramda'

// Own
import {wait} from '../lib'
import * as narrative from '../narrative'
import { RandomGenerator } from '../narrative/random'

// ===
// === BROWSER SETUP
// ===
const monitorSettings = {
    w: window.innerWidth,
    h: window.innerHeight
}

// ===
// === APPLICATION SETUP
// ===
const NARRATIVE_STILL_COUNTS = [1, 2, 3]
const NARRATIVE_STILL_WEIGHTS = [75, 15, 10]

// ===
// === PIXI
// ===

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application({
    width: monitorSettings.w,         // default: 800
    height: monitorSettings.h,        // default: 600
    antialias: true,    // default: false
    transparent: true, // default: false
    resolution: 1       // default: 1
})
app.renderer.view.style.position = "absolute"
app.renderer.view.style.display = "block"
app.renderer.autoResize = true

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view)

// The stage is the root container that will hold everything in our scene
const stage = new PIXI.Container()

// This is the projection bg
// const bg = PIXI.Sprite.fromImage('/res/gfx/background.png');
// bg.x = 0
// bg.y = 0
// bg.width = monitorSettings.w
// bg.height = monitorSettings.h
// stage.addChild(bg)

// This container is used to render the intro
const introContainer = new PIXI.Container()
introContainer.y = monitorSettings.h * 0.5
stage.addChild(introContainer)

const renderIntro = (txt: string) => {
    let text = new PIXI.Text(txt, {fontFamily : 'Arial', fontSize: 24, fill : '#ffffff', align : 'center'})

    // Interesting effect
    if (txt.length > 15) {
        text.width = monitorSettings.w*0.5
    } else {
        text.width = monitorSettings.w*0.2
    }



    text.x = monitorSettings.w/2 - text.width/2

    introContainer.removeChildren()
    introContainer.addChild(text)
}

const clearIntro = () => {
    introContainer.removeChildren()
}




// ===
// === GIBBER
// ===
Gibber.init({ globalize: false })

let SOUND_SLIDEPROJECTOR, SOUND_FAN, SOUND_VENTILATION, SOUNDS_AMBIENCE

// Constant sounds
// Projector and fan panned to center
SOUND_SLIDEPROJECTOR = new Pizzicato.Sound({
    source: 'file',
    options: { path: '/res/sfx/slide_projector.wav' }
})
SOUND_SLIDEPROJECTOR.volume = 0.5

const loadSounds = [
    new Promise(resolve => {
        SOUND_FAN = new Pizzicato.Sound({
            source: 'file',
            options: { path: '/res/sfx/fan.wav', loop: true }
        }, function () {
            resolve(true)
        })
        SOUND_FAN.volume = 1
    }),
    new Promise(resolve => {
        // Ventilation panned to right
        SOUND_VENTILATION = new Pizzicato.Sound({
            source: 'file',
            options: { path: '/res/sfx/ventilation.wav' }
        }, function () {
            resolve(true)
        })
        SOUND_VENTILATION.volume = 0.08
        var stereoPanner = new Pizzicato.Effects.StereoPanner({
            pan: 0.75
        });
        SOUND_VENTILATION.addEffect(stereoPanner);
    })
]

// ===
// === SPEECH PLAYING
// === 
interface TextToSpeechSentenceToken {
    utterance: string
    pauseAfter: number
    link: string
}
interface TextToSpeechSentence {
    text: string
    tokens: TextToSpeechSentenceToken[]
}

/**
 * Gets a link to WAV of passed text from our server
 * @param txt 
 */
const getTextToSpeech = async (txt: string) => {
    const res = await axios.post('http://localhost:2019/text-to-speech', {
        text: txt
    })
    return res.data.link
}

/**
 * Plays the passed speech link through Gibber
 * @param link 
 */
const reverb = new Pizzicato.Effects.Reverb({
    time: 0.2,
    decay: 0.8,
    reverse: false,
    mix: 0.5
})

const playSpeech = (link: string) => {
    return new Promise(resolve => {
        var sound = new Pizzicato.Sound({ 
            source: 'file',
            options: { path: link }
        }, function() {
            // Reverb
            // sound.addEffect(reverb)

            sound.volume = 0.3

            sound.on('end', () => {
                resolve(true)
            })
            sound.play()
        });
    })
}

/**
 * Creates a new sentence from passed text. The sentence is split into utterances that are then rendered and links are saved.
 * @param txt 
 */
const UTTERANCE_PAUSES = {
    '.': 1000,
    ',,': 500 
}
const createSentence = async (txt: string): Promise<TextToSpeechSentence> => {
    const sentence: TextToSpeechSentence = {
        text: txt,
        tokens: txt.split('.').filter(u => u.length).map(u => {
            return {
                utterance: u,
                pauseAfter: 500,
                link: ''
            }
        })
    }

    for (const token of sentence.tokens) {
        token.link = await getTextToSpeech(token.utterance)
    }

    return sentence
}

const renderSentence = async (sentence: TextToSpeechSentence) => {
    renderIntro(sentence.text)

    for (const token of sentence.tokens) {
        await playSpeech(token.link)
        await wait(token.pauseAfter)
    }
}


// ===
// === STILL RENDERING
// ===
const RENDER_AREA_WIDTH = 900
const RENDER_AREA_HEIGHT = 600

const renderStill = async (stillPath: string) => {
    document.getElementById('still').style.visibility = `hidden`
    document.getElementById('still').style.backgroundImage = `url('${stillPath}')`
    
    // TODO: Remove cmoment
    SOUND_SLIDEPROJECTOR.play()
    
    // New image
    await wait(1500)
    document.getElementById('still').style.visibility = 'visible'
}

const clearStills = async () => {
    // TODO: Remove cmoment
    SOUND_SLIDEPROJECTOR.play()
    await wait(1500)
    // Remove the image
    document.getElementById('still').style.backgroundImage = `none`
}

// ===
// === TEXT RENDERING
// ===
const renderStillSequence = async (utterances: string[], stillPaths: Promise<string>[], final = false) => {
    // Render the text
    for (let u of utterances) {
        const processedUtterance = u.split('\n').map(uPart => {
            if (uPart.length > 40) {
                return uPart.substring(0, 40) + uPart.substring(40).replace(' ', '\n')
            } else {
                return uPart
            }
        }).join('\n')
        

        await renderSentence(await createSentence(processedUtterance))
        await wait(1000)
    }
    await wait(1000)

    // Display the still and give time to think
    clearIntro()
    for(let stillPath of stillPaths) {
        await renderStill(await stillPath)
        await wait(5000)
    }    

    if (!final) {
        await clearStills()
        await wait(3000)
    } else {
        await renderOutro()
    }    
}

const renderTimePassage = async (utterance: string) => {
    await renderSentence(await createSentence(utterance))
    await wait(3000)
    await clearIntro()
    await wait(3000)
}

const renderOutro = async () => {
    SOUND_SLIDEPROJECTOR.play()
    await wait(1500)
    // Remove the image
    document.getElementById('still').style.backgroundImage = `none`
    document.getElementById('still').style.backgroundColor = '#ffffff'
    await wait(5000)
    document.getElementById('still').style.backgroundColor = '#000000'
}

const renderInstructions = async (excerciseName: string) => {
    await wait(7000)
    renderIntro('Please, take a seat and relax. \n The excercise will begin shortly.')

    await wait(10000)
    renderIntro(excerciseName)

    await wait(10000)
    renderIntro('This excercise is focused \n on developing your sense of nostalgia \n and broadening your cultural imagination.')

    await wait(10000)
    renderIntro('You will be presented with a set of situations.')

    await wait(10000)
    renderIntro('Try to immerse yourself into these fictions \n to achieve the expected result \n and feel nostalgic and longing for ' + excerciseName.split(':')[1] + '.')

    await wait(15000)
    clearIntro()
    await wait(5000)
}

const createNarrative = async (rng: RandomGenerator) => {
    const sequence = narrative.generateNarrativeSequence(rng)

    // Wait a while
    await wait(3000)

    // TODO: Enable again
    await renderInstructions(narrative.getExcerciseName(sequence, rng))

    // ===
    // SEQUENCE
    // ===
    await renderStillSequence(
        [
            `Imagine you are ${narrative.describeNarrativeLocation(sequence, rng)}. ${narrative.introduceNarrativeCharacter(sequence, rng)}.`,
            narrative.describeAmbience(sequence, rng)
        ],
        range(0, NARRATIVE_STILL_COUNTS[rng.weighted(NARRATIVE_STILL_WEIGHTS)]).map(i => {
            return narrative.getStillForNarrativeSequence(sequence)
        })
    )

    await renderStillSequence(
        [
            narrative.generateMediumIntro(sequence.units[0], rng),
            narrative.describeStory(sequence.units[0], rng),
            narrative.describeStoryQuality(sequence.units[0], rng),
        ],
        range(0, NARRATIVE_STILL_COUNTS[rng.weighted(NARRATIVE_STILL_WEIGHTS)]).map(i => {
            return narrative.getStillForNarrativeUnit(sequence.units[0])
        })
    )

    if (rng.chance(50)) {
        await renderStillSequence(
            [
                narrative.generateMediumNesting(sequence.units[1], sequence.units[0], rng),
                narrative.describeStory(sequence.units[1], rng),
                narrative.describeStoryQuality(sequence.units[1], rng),
            ],
            range(0, NARRATIVE_STILL_COUNTS[rng.weighted(NARRATIVE_STILL_WEIGHTS)]).map(i => {
                return narrative.getStillForNarrativeUnit(sequence.units[1])
            })
        )
    }

    await renderStillSequence(
        [
            sequence.thought.positiveGrammarResult,
            sequence.thought.positiveQualityResult
        ],
        range(0, NARRATIVE_STILL_COUNTS[rng.weighted(NARRATIVE_STILL_WEIGHTS)]).map(i => {
            return narrative.getStillForThought(sequence.thought)
        })
    )

    await renderTimePassage(narrative.describeTimePassage(rng))

    if (rng.chance(50)) {
        const words = narrative.describeWordAmbience(rng)
        for (let w of words) {
            await renderSentence(await createSentence(w))
            await wait(3000)
        }
    }

    await renderStillSequence(
        [
            `Imagine you are ${narrative.describeNarrativeLocation(sequence, rng)}. ${narrative.removeNarrativeCharacter(sequence, rng)}.`,
            narrative.describeAmbience(sequence, rng)
        ],
        range(0, NARRATIVE_STILL_COUNTS[rng.weighted(NARRATIVE_STILL_WEIGHTS)]).map(i => {
            return narrative.getStillForNarrativeSequence(sequence)
        })
    )

    await renderStillSequence(
        [
            narrative.generateMediumIntro(sequence.units[2], rng),
            narrative.describeStory(sequence.units[2], rng),
            narrative.describeStoryQuality(sequence.units[2], rng),
        ],
        range(0, NARRATIVE_STILL_COUNTS[rng.weighted(NARRATIVE_STILL_WEIGHTS)]).map(i => {
            return narrative.getStillForNarrativeUnit(sequence.units[2])
        })
    )

    if (rng.chance(25)) {
        await renderStillSequence(
            [
                narrative.generateMediumNesting(sequence.units[3], sequence.units[2], rng),
                narrative.describeStory(sequence.units[3], rng),
                narrative.describeStoryQuality(sequence.units[3], rng),
            ],
            range(0, NARRATIVE_STILL_COUNTS[rng.weighted(NARRATIVE_STILL_WEIGHTS)]).map(i => {
                return narrative.getStillForNarrativeUnit(sequence.units[3])
            })
        )
    }

    await renderStillSequence(
        [
            sequence.thought.negativeGrammarResult,
            sequence.thought.negativeQualityResult
        ],
        range(0, NARRATIVE_STILL_COUNTS[rng.weighted(NARRATIVE_STILL_WEIGHTS)]).map(i => {
            return narrative.getStillForThought(sequence.thought)
        })
    )

    if (rng.chance(50)) {
        const words = narrative.describeWordAmbience(rng)
        for (let w of words) {
            await renderSentence(await createSentence(w))
            await wait(3000)
        }
    }

    const movingOn = narrative.describeMovingOn(rng)
    await renderStillSequence(
        [
            sequence.thought.reasonResult,
            movingOn[0],
            movingOn[1]
        ],
        range(0, NARRATIVE_STILL_COUNTS[rng.weighted(NARRATIVE_STILL_WEIGHTS)]).map(i => {
            return narrative.getStillForMovingOn()
        }),
        true
    )    

    // TODO: Enable again
    await wait(5000)
}

const narrativeStart = async () => {
    let rng
    while (true) {
        rng = new RandomGenerator(Math.random())
        await createNarrative(rng)
    }
}

// ===
// Bootstrap
// ===
Promise.all(loadSounds)
.then(s => {
    // Play the ambience sounds
    SOUNDS_AMBIENCE = new Pizzicato.Group([SOUND_FAN, SOUND_VENTILATION])
    SOUNDS_AMBIENCE.play()

    // Start the narrative loop
    narrativeStart()
})


















































// === Shader test
// //Get shader code as a string
// var uniforms: any = {};
// uniforms.time = {type: '1f',value: 0};
// //Create our Pixi filter using our custom shader code
// var shaderCode = document.getElementById("shader-film-grain").innerHTML
// var simpleShader = new PIXI.Filter('', shaderCode, uniforms);

// // Create the photo
// const photo = PIXI.Sprite.fromImage("/res/stills_nos/tumblr_mw87reA3de1sfie3io1_1280.jpg")
// photo.x = monitorSettings.w / 2;
// photo.y = monitorSettings.h / 2;
// // Make sure the center point of the image is at its center, instead of the default top left
// photo.anchor.set(0.5);
// // Apply it to our object
// photo.filters = [simpleShader]
// // Add it to the screen
// stage.addChild(photo);

const startTime = Date.now()
let lastTime = Date.now()

function animate() {
    // start the timer for the next animation loop
    requestAnimationFrame(animate);

    // do time delta
    const currentTime = Date.now()
    if (currentTime - lastTime > 50) {
        //     (simpleShader.uniforms as any).time = (currentTime - startTime) / 1000
        lastTime = currentTime

        const moveX = Math.round(Math.random() * 1) * (Math.random() > 0.5 ? -1 : 1)
        const moveY = Math.round(Math.random() * 1) * (Math.random() > 0.5 ? -1 : 1)
        
        document.getElementById('still').style.marginLeft = `${moveX}px`
        document.getElementById('still').style.marginTop = `${moveY}px`
    }    
    // this is the main render call that makes pixi draw your container and its children.

    

    app.renderer.render(stage);
}
animate()