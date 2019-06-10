const axios = require('axios')
const cheerio = require('cheerio')
const R = require('ramda')

const DOWNLOAD_PATH = __dirname + `/../../res/stills/nos/`
const NOS_URL = `https://nos.twnsnd.co/page/`
const pageNumbers = R.range(1, 143)

const http = require('http');
const fs = require('fs');

console.log(pageNumbers)

const getAndParseNosPage = async (pageNo) => {
    const downloads = []
    const page = await axios.get(NOS_URL + pageNo)
    const $ = cheerio.load(page.data)

    $('.photo-wrapper-inner img').each((index, el) => {
        downloads.push(new Promise((resolve) => {
            const file = fs.createWriteStream(`${DOWNLOAD_PATH}${pageNo}_${index}.jpg`)
            const url = cheerio(el).attr('src').toString()
            axios({
                method: 'get',
                url,
                responseType:'stream'
            })
            .then(response => {
                response.data.pipe(file);
                resolve(true)
            })
        }))        
    })

    await downloads

    return true
}

const init = async () => {
    for (let pageNumber of pageNumbers) {
        console.log('Getting page: ' +  pageNumber)
        await getAndParseNosPage(pageNumber)
        console.log('Finished.')
    }
}
init()