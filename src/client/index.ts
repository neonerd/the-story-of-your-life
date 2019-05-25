declare var Gibber: any
declare var Pizzicato: any

console.log('=== The Story of Your Life')

import axios from 'axios'
import {wait, getCenter} from '../lib'

// ===
// === TESTING STUFF
// ===
const TESTING_STILLS = [
    '/res/crawler_nos/26_4.jpg',
    '/res/crawler_nos/61_1.jpg',
    '/res/crawler_nos/66_5.jpg',
    '/res/crawler_nos/75_6.jpg',
    '/res/crawler_nos/75_7.jpg',
    '/res/crawler_nos/44_8.jpg',
    '/res/crawler_nos/83_0.jpg',
    '/res/crawler_nos/54_5.jpg',
    '/res/crawler_nos/75_2.jpg',
]

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

// This container is used to rencder the stills
const stillsContainer = new PIXI.Container()
stillsContainer.y = 0
stillsContainer.x = 0
stage.addChild(stillsContainer)

// This is the projection bg
const bg = PIXI.Sprite.fromImage('/res/gfx/background.png');
bg.x = 0
bg.y = 0
bg.width = monitorSettings.w
bg.height = monitorSettings.h
stage.addChild(bg)

// This container is used to rencder the subtitles
const subtitlesContainer = new PIXI.Container()
subtitlesContainer.y = monitorSettings.h * 0.82
stage.addChild(subtitlesContainer)

// This container is used to render the intro
const introContainer = new PIXI.Container()
introContainer.y = monitorSettings.h * 0.5
stage.addChild(introContainer)

/**
 * This functions renders the subtitles
 * @param txt 
 */
const renderSubtitles = (txt: string) => {
    let text = new PIXI.Text(txt, {fontFamily : 'Arial', fontSize: 24, fill : '#ffffff', align : 'center'})
    
    // Interesting effect
    text.width = monitorSettings.w*0.5
    text.x = monitorSettings.w/2 - text.width/2

    subtitlesContainer.removeChildren()
    subtitlesContainer.addChild(text)
}

const clearSubtitles = () => {
    subtitlesContainer.removeChildren()
}

const renderIntro = (txt: string) => {
    let text = new PIXI.Text(txt, {fontFamily : 'Arial', fontSize: 24, fill : '#ffffff', align : 'center'})

    // Interesting effect
    text.width = monitorSettings.w*0.5
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

// Constant sounds
const SOUND_SLIDEPROJECTOR = new Pizzicato.Sound({
    source: 'file',
    options: { path: '/res/sfx/slide_projector.wav' }
})
const SOUND_FAN = new Pizzicato.Sound({
    source: 'file',
    options: { path: '/res/sfx/fan.wav', loop: true }
})

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
    time: 0.5,
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
            // sound.addEffect(reverb)

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
    renderSubtitles(sentence.text)

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
    stillsContainer.removeChildren(0, 10)
    SOUND_SLIDEPROJECTOR.play()
    // New image
    const still = PIXI.Sprite.fromImage(stillPath);

    await wait(1300)

    const originalHeight = still.height
    const originalWidth = still.width
    console.log('originals', still.height, still.width)

    if (still.height > still.width) {
        still.height = 600
        still.width = (still.height/originalHeight) * still.width
    } else {
        still.width = 900
        still.height = (still.width/originalWidth) * still.height
    }

    console.log('new', still.height, still.width)

    still.position.x = getCenter(still.width, monitorSettings.w)
    still.position.y = 10

    stillsContainer.addChild(still)
}

const clearStills = () => {
    stillsContainer.removeChildren()
}

// ===
// === TESTS
// ===


const audioTest = async () => {
    const sentence = await createSentence('Imagine sitting in a room with someone you love. \n There is a movie playing in the TV.')
    renderSentence(sentence)
}
// don't need to test now
// audioTest()






// Narrative test
const narrativeTest = async () => {
    // renderSubtitles('Imagine you are in a room with your parents.')

    await wait(3000)
    SOUND_FAN.play()

    await wait(7000)
    renderIntro('Please, take a seat and relax. \n The excercise will begin shortly.')

    await wait(10000)
    renderIntro('Excercise #4: Love and youth')

    await wait(10000)
    renderIntro('This excercise is focused \n on developing your sense of nostalgia \n and broadening your cultural imagination.')

    await wait(10000)
    renderIntro('You will be presented with a set of situations.')

    await wait(10000)
    renderIntro('Try to immerse yourself into these fictions \n to achieve the expected result \n and feel nostalgic and longing for \n lost youth and love.')

    await wait(15000)
    clearIntro()
    await wait(5000)

    await renderSentence(await createSentence('Imagine sitting on a couch. \n Someone you love is next to you.'))
    await wait(1000)
    await renderSentence(await createSentence('You are watching an acclaimed romantic comedy.'))
    await wait(1000)
    await renderSentence(await createSentence('A young couple struggles. They overcome \n all obstacles with courage and wisdom.'))
    await wait(1000)

    clearSubtitles()
    await renderStill(TESTING_STILLS[5])
    await wait(10000)
    clearStills()
    await wait(1000)

    await renderSentence(await createSentence('You can see an old painting at one point in the movie.'))
    await wait(1000)
    await renderSentence(await createSentence('It depicts a group of businessmen angrily discussing something.'))
    await wait(1000)
    await renderSentence(await createSentence('They look so angry.'))
    await wait(1000)

    clearSubtitles()
    await renderStill(TESTING_STILLS[6])
    await wait(10000)
    clearStills()
    await wait(1000)

    
    await renderSentence(await createSentence('Back in the movie a rock song plays in the background.'))
    await wait(1000)
    await renderSentence(await createSentence('Someone is singing about failure and betrayal.'))
    await wait(1000)

    clearSubtitles()
    await renderStill(TESTING_STILLS[7])
    await wait(10000)
    clearStills()
    await wait(1000)

    
    await renderSentence(await createSentence('Your mind wanders. You remember the \n times you were happy in high school.'))
    await wait(1000)
    await renderSentence(await createSentence('Everyone was friendly. Pretty. Thoughtful.'))
    await wait(1000)

    clearSubtitles()
    await renderStill(TESTING_STILLS[8])
    await wait(10000)
    clearStills()
    await wait(1000)

    await renderSentence(await createSentence('Imagine sitting on a couch. \n Someone you maybe love is next to you.'))
    await wait(1000)
    clearSubtitles()
}
narrativeTest()

import {generateNarrativeSequence} from '../narrative'

const generationTest = async () => {
    const seq = generateNarrativeSequence()
    console.log(seq.units)
}
// generationTest()









































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

        const moveX = Math.round(Math.random() * 1)
        const moveY = Math.round(Math.random() * 1)
        
        stillsContainer.x = 0 + moveX
        stillsContainer.y = 0 + moveY

        bg.x = 0 + moveX
        bg.y = 0 + moveY
    }    
    // this is the main render call that makes pixi draw your container and its children.

    

    app.renderer.render(stage);
}
animate()