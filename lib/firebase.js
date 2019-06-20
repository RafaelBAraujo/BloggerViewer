const firebase = require('firebase-admin')

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

    async uploadFile(path) {
        this.bucket.upload(path).then((snapshot) => {
            return snapshot
        })
    }

    async downloadFile(prefix) {

        return await this.bucket.getFiles({prefix: prefix}).then((files) => {
            return files[0][0]
        })
    }

}

module.exports = Firebase