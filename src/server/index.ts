import * as fs from 'fs'
import * as path from 'path'
import * as crypto from 'crypto'

import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'

import * as textToSpeech from '@google-cloud/text-to-speech'

// === 
// === CONFIG
// ===
const DIR_TMP = __dirname + '/../../tmp'
console.log('TheStoryOfYourLife ~ DIR_TMP set to: ' + DIR_TMP)

interface TextToSpeechVoice {
    languageCode: string
    name: string
    speakingRate: number
    pitch: number
}

const AVAILABLE_VOICES: TextToSpeechVoice[] = []
const DEFAULT_VOICE: TextToSpeechVoice = {
    languageCode: 'fr-FR',
    name: 'fr-FR-Wavenet-C',
    speakingRate: 0.75,
    pitch: 0
}

// ===
// === APPP
// ===

// Creates a client
const tsClient = new textToSpeech.TextToSpeechClient()

/**
 * Config
 */
const PORT = process.env.PORT || 2019

const app = express()
app.use(cors())
app.use(bodyParser())
app.use('/files', express.static(DIR_TMP))

app.post('/text-to-speech', async (req, res, next) => {
    // Create the Text-to-Speech request
    const tsRequest = {
        input: {text: req.body.text},
        // Select the language and SSML Voice Gender (optional)
        voice: {
            languageCode: DEFAULT_VOICE.languageCode,
            name: DEFAULT_VOICE.name
        },
        // Select the type of audio encoding
        audioConfig: {
            audioEncoding: 'LINEAR16',
            speakingRate: DEFAULT_VOICE.speakingRate,
            pitch: DEFAULT_VOICE.pitch
        }
    };
    // Performs the Text-to-Speech request
    tsClient.synthesizeSpeech(tsRequest, (err: any, response: any) => {
        if (err) {
            console.error('ERROR:', err)
            res.statusCode = 500
            res.json({status: 'ERROR'})
            return
        }

        // Assign a random output
        const hash = crypto.createHash('md5')
        hash.update(Math.random().toString())
        hash.update(Date.now().toString())
        const outputName = `${hash.digest('hex')}.wav`
    
        // Write the binary audio content to a local file
        fs.writeFile(path.join(DIR_TMP, outputName), response.audioContent, 'binary', err => {
            if (err) {
                console.error('ERROR:', err)
                res.statusCode = 500
                res.json({status: 'ERROR'})
                return
            }

            res.json({
                status: 'OK',
                link: `http://localhost:2019/files/${outputName}`
            })
        });
    });
})

app.listen(PORT)
console.log('TheStoryOfYourLife ~ Server is running at ' + PORT)