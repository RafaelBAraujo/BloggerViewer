const firebase = require('firebase-admin')
const googleStorage = require('@google-cloud/storage')

class Firebase {

    constructor() {

        let serviceAccount = require('../serviceAccountKey.json')

        firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount),
            databaseURL: 'https://bloggerviewer-dccb0.firebaseio.com',
            storageBucket: 'gs://bloggerviewer-dccb0.appspot.com'
        });

        this.database = firebase.database()
        this.bucket = firebase.storage().bucket()
        
    }

    async uploadData(ref, data) {
        await this.database.ref(ref).set(data, (error) => {
            return error
        })
    }

    async downloadData(ref) {

        let snapshot = await this.database.ref(ref).once('value')

        return snapshot.val()

    }

    async uploadFile(path) {
        this.bucket.upload(path).then((snapshot) => {
            return snapshot
        })
    }

    async uploadFileFromStream(stream, fileName) {
        const file = this.bucket.file(fileName)

        stream.pipe(file.createWriteStream())
        .on('error', function(err) {
            console.log('The file could not be uploaded.')
            console.log(err)
        })
        .on('finish', function() {
            console.log('Upload from stream is complete')
        })
    }

    async downloadFile(prefix) {

        return await this.bucket.getFiles({prefix: prefix}).then((files) => {

            return files[0][0]
            
        })
    }

    async downloadFile2(prefix) {

        return await this.bucket.bucket('bloggerviewer-dccb0.appspot.com').file(prefix)
    }

}

module.exports = Firebase