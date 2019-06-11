const AVAILABLE_TAGS = [
    'love',
    'adventure',
    'wanderlust',
    'emotions',
    'youth'
]

const app = new Vue({
    el: '#app',
    mounted () {
        const p = [
            this.loadStills(),
            this.loadFiles()
        ]

        Promise.all(p)
            .then(r => {
                this.loadNextStillToProcess()
            })
    },
    methods: {
        loadFiles () {
            return axios.get('http://localhost:2019/db/files')
                .then(res => {
                    this.filesAvailable = res.data.files
                    this.filesLoaded = true
                })
        },
        loadStills () {
            return axios.get('http://localhost:2019/db/data')
                .then(res => {
                    this.stills = res.data.stills.map(s => s.file)
                    this.stillsLoaded = true
                })
        },
        loadNextStillToProcess () {
            this.isCurrentStillLoaded = false
            this.currentStill = {
                file: this.unprocessedFiles[0],
                isValid: true,
                tags: []
            }
            this.isCurrentStillLoaded = true
        },
        toggleTagInCurrentStill (t) {
            if (this.currentStill.tags.indexOf(t) < 0) {
                this.currentStill.tags.push(t)
            } else {
                this.currentStill.tags = R.without([t], this.currentStill.tags)
            }
        },
        submitCurrentStill () {
            axios.post('http://localhost:2019/db/data', this.currentStill)
                .then(res => {
                    this.stills.push(this.currentStill.file)
                    this.loadNextStillToProcess()
                })
        },
        throwAwayCurrentStill () {
            this.currentStill.isValid = false
            this.currentStill.tags = []
            
            axios.post('http://localhost:2019/db/data', this.currentStill)
                .then(res => {
                    this.stills.push(this.currentStill.file)
                    this.loadNextStillToProcess()
                })
        }
    },
    computed: {
        isDataLoaded () {
            return this.filesLoaded && this.stillsLoaded
        },
        unprocessedFiles () {
            return R.without(this.stills, this.filesAvailable)
        },
        availableTags () {
            return R.clone(AVAILABLE_TAGS)
        }
    },
    data () {
        return {
            isCurrentStillLoaded: false,
            currentStill: {},

            filesLoaded: false,
            filesAvailable: [],

            stillsLoaded: false,
            stills: []
        }
    }
  })