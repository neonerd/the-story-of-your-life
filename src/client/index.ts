declare var Gibber: any
declare var Pizzicato: any

console.log('=== The Story of Your Life')

import axios from 'axios'
import {wait, getCenter} from '../lib'
import {max} from 'ramda'

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
SOUND_SLIDEPROJECTOR.volume = 0.5
const SOUND_FAN = new Pizzicato.Sound({
    source: 'file',
    options: { path: '/res/sfx/fan.wav', loop: true }
})
SOUND_FAN.volume = 1

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

            sound.volume = 0.3

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
const renderStillSequence = async (utterances: string[], stillPath: string, final = false) => {
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
    await renderStill(stillPath)
    await wait(5000)

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

const renderInstructions = async (excerciseNo: number, topics: string) => {
    await wait(7000)
    renderIntro('Please, take a seat and relax. \n The excercise will begin shortly.')

    await wait(10000)
    renderIntro('Excercise #' + excerciseNo + ': ' + topics)

    await wait(10000)
    renderIntro('This excercise is focused \n on developing your sense of nostalgia \n and broadening your cultural imagination.')

    await wait(10000)
    renderIntro('You will be presented with a set of situations.')

    await wait(10000)
    renderIntro('Try to immerse yourself into these fictions \n to achieve the expected result \n and feel nostalgic and longing for \n ' + topics + '.')

    await wait(15000)
    clearIntro()
    await wait(5000)
}

// Narrative test
const narrativeTest = async () => {
    await wait(3000)
    SOUND_FAN.play()

    // await renderInstructions(5, 'wanderlust and friendship')

    //
    // THE MEAT
    //
    
    await renderStillSequence(
        [
            'Imagine you are sitting in the garden. Your best friend is next to you.',
            'You can smell fresh rain evaporating from hot pavement.'
        ],
        '/res/stills/slideofthetimes/tumblr_p4b3skAKUQ1x4cwtgo1_1280.jpg'
    )

    await renderStillSequence(
        [
            'You are listening to a famous song.',
            'The singer sings about a long-distance relationship.',
            'It is very honest.'
        ],
        '/res/stills/reddit_sub_oldschoolcool/bsjus2-Nick_Lowe_in_the_studio__circa_1978-t9JMmAY.jpg'
    )

    await renderStillSequence(
        [
            'The song mentions a controversial episode of a TV series.',
            'A boy and a girl face betrayal and grief.',
            'The episode is aesthetically pleasing.'
        ],
        '/res/stills/slideofthetimes/tumblr_p4bd4mnGvX1x4cwtgo1_1280.jpg'
    )

    await renderStillSequence(
        [
            'You think of the summer when you travelled the country with your family.',
            'You were really happy back then.'
        ],
        '/res/stills/thesillyhippy/tumblr_n3sbfxI7Gb1spwacto2_1280.jpg'
    )

    await renderTimePassage('But time passes.')

    await renderStillSequence(
        [
            'Imagine you are sitting in the garden. Your best friend is no longer with you.',
            'You can hear kids playing outside.'
        ],
        '/res/stills/thesillyhippy/tumblr_oejdr35l4y1rsrjrno2_1280.jpg'
    )

    await renderStillSequence(
        [
            'For some reason, it reminds you of a painting.',
            'It depicts an aging soldier.',
            'It is very tasteful.'
        ],
        '/res/stills/nos/8_5.jpg'
    )

    await renderStillSequence(
        [
            'You think of your other trips and adventures.',
            'They were not really that happy again, were they.',

            'Maybe we should have stopped them sooner.',
            'Maybe the mountains would be a happier place \n without some sorts of people.',

            'But everything is fine now.',
            'We can move on.'
        ],
        '/res/stills/nos/78_0.jpg',
        true
    )

    // Sample no. 2

    await renderInstructions(6,'love and sadness')

    await renderStillSequence(
        [
            'Imagine you are sitting on a sofa. \n You are spending time with your cousin.',
            'An old clock is ticking nearby.'
        ],
        '/res/stills/nos/79_0.jpg'
    )

    await renderStillSequence(
        [
            'You are reading an acclaimed book.',
            'It is about a great journey \n of a shy man and a bit unconventional.'
        ],
        '/res/stills/nos/84_1.jpg'
    )

    await renderStillSequence(
        [
            'You suddenly remember the third time  you were in love.',
            'The feeling warms you up. Love is beautiful.'
        ],
        '/res/stills/sealedintime/tumblr_poggo6F4Sc1y62e4co1_640.jpg'
    )

    await renderTimePassage('But life goes on.')

    await renderStillSequence(
        [
            'Imagine you are sitting on a sofa. \n Your cousin has moved far away.',
            'A thunderstorm is coming.'
        ],
        '/res/stills/slideofthetimes/tumblr_pg606cAFx61x4cwtgo1_1280.jpg'
    )

    await renderStillSequence(
        [
            'You are watching a crime movie.',
            'It is about a woman and hate. Inspirational.'
        ],
        '/res/stills/coolkidsofhistory/tumblr_op1faat9DE1w8i449o1_1280.jpg'
    )

    await renderStillSequence(
        [
            'At one point in the movie,\n a talkshow plays in the background.',
            'An outgoing attorney talks with the host.',
            'They are passionately discussing\n society and purpose.'
        ],
        '/res/stills/nos/75_8.jpg'
    )

    await renderStillSequence(
        [
            'You remember your third love again. \n Was it ever the same?',
            'Things got sadder and sadder. So sad.',

            'But now we are in better place.',
            'You can move on. Find a new life.'
        ],
        '/res/stills/nos/124_4.jpg',
        true
    )

}
narrativeTest()






// === 
// === REAL BOOTSTRAP
// ===
import {generateNarrativeSequence} from '../narrative'

const generationTest = async () => {
    // const seq = generateNarrativeSequence()
    // console.log(seq.units)
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

        const moveX = Math.round(Math.random() * 1) * (Math.random() > 0.5 ? -1 : 1)
        const moveY = Math.round(Math.random() * 1) * (Math.random() > 0.5 ? -1 : 1)
        
        document.getElementById('still').style.marginLeft = `${moveX}px`
        document.getElementById('still').style.marginTop = `${moveY}px`
    }    
    // this is the main render call that makes pixi draw your container and its children.

    

    app.renderer.render(stage);
}
animate()