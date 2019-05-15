declare var Gibber: any
declare var Pizzicato: any

console.log('=== The Story of Your Life')

import axios from 'axios'
import {wait} from '../lib'

// ===
// === BROWSER SETPU
// ===
const monitorSettings = {
    w: window.innerWidth,
    h: window.innerHeight
}

// ===
// === APPLICATION SETUP
// ===

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
    transparent: false, // default: false
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

// This container is used to rencder the subtitles
const subtitlesContainer = new PIXI.Container()
subtitlesContainer.y = monitorSettings.h * 0.75
stage.addChild(subtitlesContainer)

const renderSubtitles = (txt: string) => {
    let text = new PIXI.Text(txt, {fontFamily : 'Arial', fontSize: 24, fill : '#ffffff', align : 'center'})
    
    // Interesting effect
    text.width = monitorSettings.w*0.5
    text.x = monitorSettings.w/2 - text.width/2

    subtitlesContainer.addChild(text)
}




// ===
// === GIBBER
// ===
Gibber.init({ globalize: false })

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
    time: 1,
    decay: 0.8,
    reverse: true,
    mix: 0.5
})

const playSpeech = (link: string) => {
    return new Promise(resolve => {
        var sound = new Pizzicato.Sound({ 
            source: 'file',
            options: { path: link }
        }, function() {
            // Reverb
            sound.addEffect(reverb)

            sound.on('end', () => {
                resolve(true)
            })
            sound.play()
        });
    })   

    // Gibber
    // Load and wait for the loading to finish
    // s.load(link)
    // setTimeout(() => {
    //     s.note(1)
    // }, 500)
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
        tokens: txt.split('.').map(u => {
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
    renderSubtitles(sentence.text)

    for (const token of sentence.tokens) {
        await playSpeech(token.link)
        await wait(token.pauseAfter)
    }
}







const test = async () => {
    const sentence = await createSentence('Imagine sitting in a room with someone you love. There is a movie playing in the TV.')
    renderSentence(sentence)
}

// don't need to test now
// test()






// Narrative test
const narrativeTest = async () => {
    renderSubtitles('Imagine you are in a room with your parents.')
}
narrativeTest()












































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

// const startTime = Date.now()
// let lastTime = Date.now()

function animate() {
    // start the timer for the next animation loop
    requestAnimationFrame(animate);

    // do time delta
    // const currentTime = Date.now()
    // if (currentTime - lastTime > 50) {
    //     (simpleShader.uniforms as any).time = (currentTime - startTime) / 1000
    //     lastTime = currentTime
    // }    
    // this is the main render call that makes pixi draw your container and its children.

    

    app.renderer.render(stage);
}
animate()