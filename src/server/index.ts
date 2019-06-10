import * as fs from 'fs'
import * as path from 'path'
import * as crypto from 'crypto'

import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'

import * as textToSpeech from '@google-cloud/text-to-speech'

import * as recursiveReadDir from 'recursive-readdir'

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

const AVAILABLE_VOICES: TextToSpeechVoice[] = [
    {
        languageCode: 'fr-FR',
        name: 'fr-FR-Wavenet-C',
        speakingRate: 0.75,
        pitch: 0
    },
    {
        languageCode: 'de-DE',
        name: 'de-DE-Wavenet-A',
        speakingRate: 0.85,
        pitch: -4
    },
    {
        languageCode: 'de-DE',
        name: 'de-DE-Wavenet-C',
        speakingRate: 0.85,
        pitch: -4.40
    }
]
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
    // Assign a random output
    const hash = crypto.createHash('md5')
    hash.update(req.body.text)

    const outputName = `${hash.digest('hex')}.wav`
    const outputPath = path.join(DIR_TMP, outputName)

    if (fs.existsSync(outputPath)) {
        res.json({
            status: 'OK',
            link: `http://localhost:2019/files/${outputName}`
        })
        return
    }

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

        

        

        if (fs.existsSync(outputPath)) {
            res.json({
                status: 'OK',
                link: `http://localhost:2019/files/${outputName}`
            })
        } else {    
            // Write the binary audio content to a local file
            fs.writeFile(outputPath, response.audioContent, 'binary', err => {
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
        }   
    });
})

// ===
// === PHOTO DATABASE
// ===
const DIR_STILLS = __dirname + '/../../res/stills'

app.get('/db/files', async (req, res) => {
    recursiveReadDir(DIR_STILLS, (err, files) => {
        res.json({
            status: 'OK',
            files
        })
    })
})

app.get('/db/data', async (req, res) => {

})


app.listen(PORT)
console.log('TheStoryOfYourLife ~ Server is running at ' + PORT)