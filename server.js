const express = require('express')
const env = require('custom-env').env('staging')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const cors = require('cors')
const xlsx = require('xlsx')
var stream = require('stream');

const app = express()

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

const Utils = require('./lib/utils')
const BloggerMock = require('./lib/blogger-mock')
const BloggerRequestApi = require('./lib/blogger-request')
const BloggerResponse = require('./lib/blogger-response')
const Classroom = require('./lib/classroom')
const Firebase = require('./lib/firebase')

let firebase = new Firebase()

const hostname = process.env.HOSTNAME
const port = process.env.PORT

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));

const blogs = {}
blogs['adm_tec'] = 'https://adm-tecnic.blogspot.com/'
blogs['adm_si'] = 'https://adm-bsi.blogspot.com'
blogs['tgs'] = 'https://tgs-bsi.blogspot.com/'

app.get('/visualizer/:blog/getLastPost', (req, res) => {

    let blogUrl = blogs[req.params.blog]

    BloggerRequestApi.getBlogId(blogUrl).then((blog) => {
        BloggerRequestApi.getLastPost(blog.id).then((lastPost) => {
            BloggerRequestApi.getCommentsByPost(blog.id, lastPost.id).then((comments) => {
                BloggerRequestApi.getPosts(blog.id).then((posts) => {
                    firebase.downloadData('classes/'+lastPost.id).then((classroom) => {

                        res.json(new BloggerResponse(blog, lastPost, classroom, comments, posts))

                    })
                })
            })
        })
    })

})

app.get('/visualizer/:blog/getPost/:id', (req, res) => {

    let start = new Date()

    let blogUrl = blogs[req.params.blog]
    let postId = req.params.id

    BloggerRequestApi.getBlogId(blogUrl).then((blog) => {
        BloggerRequestApi.getPostById(blog.id, postId).then((fetchedPost) => {
            BloggerRequestApi.getCommentsByPost(blog.id, fetchedPost.id).then((comments) => {
                BloggerRequestApi.getPosts(blog.id).then((posts) => {
                    firebase.downloadData('classes/'+postId).then((classroom) => {

                        res.json(new BloggerResponse(blog, fetchedPost, classroom, comments, posts))
    
                        let end = new Date() - start
                        console.info('Execution time: %dms', end)

                    })
                })
            })
        })
    })

})

app.get('/visualizer/test', (req, res) => {

    let blogUrl = blogs['adm_si']
    
    BloggerRequestApi.getBlogId(blogUrl).then((blog) => {
        BloggerRequestApi.getLastPost(blog.id).then((lastPost) => {
            BloggerRequestApi.getCommentsByPost(blog.id, lastPost.id).then((comments) => {
                BloggerRequestApi.getPosts(blog.id).then((posts) => {
                    firebase.downloadData('classes/'+postId).then((classroom) => {

                        let start = new Date()
                        const bresponse = new BloggerResponse(blog, lastPost, classroom, comments, posts)
                        let end = new Date() - start
                        console.info('Execution time: %dms', end)
                        res.json(bresponse.post.comments)

                    })
                })
            })
        })
    })

})

app.get('visualizer/mock', (req, res) => {

    res.json(BloggerMock.getPost())

})

var multer = require('multer')
var storage = multer.diskStorage({
    
    destination: './private/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }

})

let upload = multer({ storage: storage }).single('file')

app.post('/upload', (req, res) => {


    upload(req, res, function (err) {

        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)

        } else if (err) {
            console.log(err)
            return res.status(500).json(err)

        } else {

            const workbook = xlsx.readFile(req.file.path)
            const worksheet = workbook.Sheets[workbook.SheetNames[0]]
            let jstring = JSON.stringify(xlsx.utils.sheet_to_json(worksheet, {header: 0, raw: true}))
            
            let classroom = new Classroom(req.file.originalname, Utils.filterStudents(jstring))

            firebase.uploadData('classes/' + req.file.originalname, classroom).then((error) => {
                if (error) {
                    console.log(error)
                    res.status(505).send(req.body)
                }
            })

            /*var rs = new stream.Readable({ objectMode: true });
            rs.push(jstring)
            rs.push(null)


            firebase.uploadFileFromStream(rs, req.file.originalname+'.json')*/

            return res.status(200).send(req.file)

        }

    })

})

app.get('/getClass/:postId', (req, res) => {

    let postId = req.params.postId

    firebase.downloadData('classes/' + postId).then((data) => {
        res.json(data)
    })

})

app.get('/getClassFile/:query', (req, res) => {

    let query = req.params.query

    firebase.downloadFile(query).then((file) => {

        let content = ''

        file.createReadStream()
            .on('data', (data) => {
                content += data
            })
            .on('error', (error) => {
                console.log('An error ocurred while reading the file stream.')
                console.log(error)
            })
            .on('end', () => {
                res.setHeader('Content-Type', 'application/json')
                let jsonObj = JSON.parse(content)
                res.json(jsonObj)
            })

    })

})

app.get('/download/:query', (req, res) => {

    let query = req.params.query

    firebase.downloadFile(query).then((file) => {

        res.setHeader('Content-Length', file.metadata.size);
        res.setHeader('Content-Type', file.metadata.contentType);
        res.setHeader('Content-Disposition', 'attachment; filename=' + file.metadata.name);

        
        let writeStream = file.createReadStream()
        writeStream.pipe(res)
        res.end()
    })

})

app.post('/uploadClass', (req, res) => {

    console.log(req.body)

    // firebase.uploadData('classes/', req.body).then((error) => {
    //     let now = new Date();
    //     let timeString = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDay() + 'AT' + now.getHours()+now.getMinutes()+now.getSeconds()
    //     if (error) {
    //         fs.writeFile('./private/log/error/' + timeString + '.error.log', JSON.stringify(error), 'utf-8', (err, result) => {
    //             if(err) console.log(err)
    //         })
    //         res.status(505).send(req.body)
    //     } else {
    //         fs.writeFile('./private/log/request/' + timeString + '.request.log', JSON.stringify({ header: req.headers, body: req.body }), 'utf-8', (err, result) => {
    //             if(err) console.log(err)
    //         })
    //         res.status(200).send(req.body)
    //     }
    // })

})

app.listen(port, hostname, () => {
	console.log('Server running at http://' + hostname + ':' + port + '/');
})