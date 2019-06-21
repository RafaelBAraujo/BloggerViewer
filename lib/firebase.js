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
        this.buf = ''

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

    pump() {
        var pos;
    
        while ((pos = this.buf.indexOf('\n')) >= 0) { // keep going while there's a newline somewhere in the buffer
            if (pos == 0) { // if there's more than one newline in a row, the buffer will now start with a newline
                this.buf = this.buf.slice(1); // discard it
                continue; // so that the next iteration will start with data
            }
            processLine(this.buf.slice(0,pos)); // hand off the line
            this.buf = this.buf.slice(pos+1); // and slice the processed data off the buffer
        }
    }
    
    processLine(line) { // here's where we do something with a line
    
        if (line[line.length-1] == '\r') line=line.substr(0,line.length-1); // discard CR (0x0D)
    
        if (line.length > 0) { // ignore empty lines
            var obj = JSON.parse(line); // parse the JSON
            console.log(obj); // do something with the data here!
        }
    }

}

module.exports = Firebase