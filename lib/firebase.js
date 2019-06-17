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

    async uploadFile(file) {
        this.bucket.upload(file.path).then((snapshot) => {
            console.log('snapshot: ' + snapshot)
            return 'success'
        })
        .catch((error) => {
            return error
        })
    }

    async downloadFile(prefix) {
        this.bucket.getFiles({prefix: prefix}).then((files) => {
            return files
        })
        .catch((error) => {
            return error
        })
    }

}

module.exports = Firebase