const express = require('express')
const env = require('custom-env').env('staging')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const parse = require('csv-parse')
const cors = require('cors')
const xlsx = require('xlsx')
var mime = require('mime')
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
const Professor = require('./lib/professor')

let firebase = new Firebase()
let professor = new Professor(firebase)

const hostname = process.env.HOSTNAME
const port = process.env.PORT

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));

const blogs = {}
let lastUrl = ''
blogs['adm_tec'] = 'https://adm-tecnic.blogspot.com/'
blogs['adm_si'] = 'https://adm-bsi.blogspot.com'
blogs['tgs'] = 'https://tgs-bsi.blogspot.com/'

app.post('/getBlogInfo/', (req, res) => {

    let body = JSON.parse(JSON.stringify(req.body))
    lastUrl = body.blogUrl

    BloggerRequestApi.getBlogId(body.blogUrl).then((blog) => {
        BloggerRequestApi.getPosts(blog.id).then((posts) => {
            console.log(blog.id)
            blog.posts = posts
            res.json(blog)
        })
    })    

})

app.post('/getPostInfo/', (req, res) => {

    let body = JSON.parse(JSON.stringify(req.body))
    let blogId = body.blogId
    let postId = body.postId

    BloggerRequestApi.getPostById(blogId, postId).then((post) => {
        res.json(post)
    })

})

app.get('/visualizer/lastBlog/getLastPost', (req, res) => {


    BloggerRequestApi.getBlogId(lastUrl).then((blog) => {
        BloggerRequestApi.getLastPost(blog.id).then((lastPost) => {
            BloggerRequestApi.getCommentsByPost(blog.id, lastPost.id).then((comments) => {
                BloggerRequestApi.getPosts(blog.id).then((posts) => {
                    firebase.downloadData('classes/'+blog.id+'/studentsNames/students').then((classroom) => {
                        firebase.downloadData('classes/'+blog.id+'/posts/'+lastPost.id+'/keywords/').then((keywords) => {

                            res.json(new BloggerResponse(blog, lastPost, classroom, comments, posts, keywords))

                        })
                    })
                })
            })
        })
    })

})

app.get('/visualizer/:blog/getPost/:id', (req, res) => {

    let start = new Date() 

    // let blogUrl = 'https://bsi-administra.blogspot.com/'
    let blog = {}
    blog.id = req.params.blog
    let postId = req.params.id

    // BloggerRequestApi.getBlogId(blogUrl).then((blog) => {
        BloggerRequestApi.getPostById(blog.id, postId).then((fetchedPost) => {
            BloggerRequestApi.getCommentsByPost(blog.id, fetchedPost.id).then((comments) => {
                BloggerRequestApi.getPosts(blog.id).then((posts) => {
                    firebase.downloadData('classes/'+blog.id+'/studentsNames/students').then((classroom) => {
                        firebase.downloadData('classes/'+blog.id+'/posts/'+fetchedPost.id+'/keywords/').then((keywords) => {

                            res.json(new BloggerResponse(blog, fetchedPost, classroom, comments, posts, keywords))
        
                            let end = new Date() - start
                            console.info('Execution time: %dms', end)

                        })
                    })
                })
            })
        })
    // })

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

app.get('/analyseBlog/:blogId', (req, res) => {

    let blogId = req.params.blogId

    professor.analyseBlog(blogId).then(() => {

        res.status(200).json({})

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

app.post('/uploadSpreadsheet/:blogId', (req, res) => {

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
            
            let classroom = new Classroom(Utils.filterStudents(jstring))

            firebase.uploadData('classes/'+req.params.blogId+'/studentsNames/', classroom).then((error) => {
                if (error) {
                    console.log(error)
                    res.status(505).send(req.body)
                }
            })

            // firebase.uploadFile(req.file.path)

            let rs = fs.createReadStream(req.file.path)

            // let rs = new stream.Readable({ objectMode: true });
            // rs.push(jstring)
            // rs.push(null)


            firebase.uploadFileFromStream(rs, req.params.blogId+'.xlsx')

            return res.status(200).send(req.file)

        }

    })

})

app.post('/uploadConcepts/:blogId/:postId', (req, res) => {

    let blogId = req.params.blogId
    let postId = req.params.postId

    let ignore = new Set(['da', 'de', 'do', 'das', 'dos', 'e', 'em', 'o'])

    upload(req, res, function (err) {

        if (err) {

            return res.status(500).json(err)

        } else {

            let csvData = []
            fs.createReadStream(req.file.path)
            .pipe(parse({delimiter: ',', columns: true}))
            .on('data', (csvRow) => {

                let data = { keyword: '', regexList: [] }
                Object.keys(csvRow).forEach((csvColumn) => {
                    if(csvColumn.length > 2) {
                        data.keyword = csvRow[csvColumn]
                    } else {
                        if(csvRow[csvColumn].length > 0 && csvRow[csvColumn] != 'undefined') {
                            let regexObj = { options: { sameSentence: false }, regex: '', weight: 1}
                            let regexSplit = csvRow[csvColumn].split('weight:')
                            regexObj.regex = regexSplit[0]
                            regexObj.weight = regexSplit[1]
                            data.regexList.push(regexObj)
                        }
                    }
                })

                console.log('data:')
                console.log(JSON.stringify(data))
                
                csvData.push(data)

            })
            .on('end', () => {
                BloggerRequestApi.getPostById(blogId, postId).then((post) => {
                    firebase.uploadData('classes/'+blogId+'/posts/'+postId+'/numOfComments/', post.replies.totalItems)    
                })
                console.log(csvData)
                firebase.uploadData('classes/'+blogId+'/posts/'+postId+'/keywords/', csvData)
                console.log('blogId: ' + blogId + ' postId: ' + postId)
                let rs = fs.createReadStream(req.file.path)
                firebase.uploadFileFromStream(rs, req.file.originalname+'.'+mime.getExtension(req.file.mimetype))
                return res.status(200).json(csvData)
            })

        }

    })

})

app.post('/updateRegex/', (req, res) => {

    let body = JSON.parse(JSON.stringify(req.body))

    console.log(body)
    firebase.uploadData('/classes/'+body.blogId+'/posts/'+body.postId+'/keywords/', body.regexList)

    res.status(200).send(req.body)
})

app.post('/uploadFile/', (req, res) => {


    upload(req, res, function (err) {

        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)

        } else if (err) {
            console.log(err)
            return res.status(500).json(err)

        } else {

            let rs = fs.createReadStream(req.file.path)
            firebase.uploadFileFromStream(rs, req.file.originalname+'.'+mime.getExtension(req.file.mimetype))

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

app.get('/getSpreadsheet/:blogId/:postId', (req, res) => {

    let blogId = req.params.blogId
    let postId = req.params.postId

    firebase.downloadFile(blogId+'.xlsx').then((file) => {

        let buffers = []

        file.createReadStream()
        .on('data', (data) => {
            buffers.push(data)
        })
        .on('error', (error) => {
            console.log('An error ocurred while reading the file stream.')
            Utils.logError(error)
        })
        .on('end', () => {

            firebase.downloadFile('blog_concepts_template.xlsx').then((templateFile) => {

                let templateBuffers = []

                templateFile.createReadStream()
                .on('data', (data) => {
                    templateBuffers.push(data)
                })
                .on('error', (error) => {
                    console.log('An error ocurred while reading the file stream.')
                    Utils.logError(error)
                })
                .on('end', () => {

                    firebase.downloadData('classes/'+blogId+'/posts/'+postId+'/').then((post) => {
                        firebase.downloadData('classes/'+blogId+'/students/').then((students) => {
                            BloggerRequestApi.getPostById(blogId, postId).then((bloggerPost) => {
                                BloggerRequestApi.getCommentsByPost(blogId, postId).then((comments) => {
                                    firebase.downloadData('classes/'+blogId+'/studentsNames/students/').then((studentsNames) => {
            
                                        let parsedStudents = []
            
                                        studentsNames.forEach((student) => {
                                            parsedStudents[student.RA] = { name: student.Nome }
                                        })
            
                                        let commentsWorksheet = Utils.createCommentSheet(bloggerPost, comments, parsedStudents)
            
                                        let buffer = Buffer.concat(buffers)
                                        let templateBuffer = Buffer.concat(templateBuffers)
                                        // let data = Buffer.from(buffer, "base64")
                                        // let classWorksheet = Utils.createClassSummarySheet(students, post, postId)
                        
                                        let workbook = xlsx.read(buffer, {type: 'buffer'})
                                        let templateWorkbook = xlsx.read(templateBuffer, {type: 'buffer'})
                                        let templateWorksheet = templateWorkbook.Sheets['Extracao_Blog']
                                        
                                        let extracaoBlogWorksheet = Utils.createClassSummarySheet(templateWorksheet, students, post, postId)

                                        let sheetName = 'Import_Blog_'+bloggerPost.title.split(' - ')[0]
                                        if(sheetName.length >= 31) { sheetName = sheetName.substr(0, 30) }
                                        xlsx.utils.book_append_sheet(workbook, commentsWorksheet, sheetName)
                                        xlsx.utils.book_append_sheet(workbook, extracaoBlogWorksheet, 'Extracao_Blog')
                        
                                        var workbookBuffer = xlsx.write(workbook, {
                                            type: 'buffer'
                                        })
                    
                                        let readStream = new stream.PassThrough()
                                        readStream.end(workbookBuffer)
                                            
                                        res.setHeader('Content-Length', workbookBuffer.length)
                                        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                                        res.setHeader('Content-Disposition', 'attachment; filename=' + blogId + '.xlsx')
                                        res.status(200)
                                        // res.end(Buffer.from(workbookBuffer, 'base64'))
                                        readStream.pipe(res)
            
                                    })
                                })
                            })
                        })
                    })
                })
            })

        })
            
    })

})

app.get('/getSpreadsheet/:query', (req, res) => {

    let query = req.params.query

    firebase.downloadFile(query+'.xlsx').then((file) => {

        let buffers = []

        file.createReadStream()
        .on('data', (data) => {
            buffers.push(data)
        })
        .on('error', (error) => {
            console.log('An error ocurred while reading the file stream.')
            Utils.logError(error)
        })
        .on('end', () => {

            firebase.downloadData('classes/' + query).then((classData) => {

                let buffer = Buffer.concat(buffers)

                let classWorksheet = Utils.class_to_sheet(classData)

                let workbook = xlsx.read(buffer, {type: 'buffer'})
                xlsx.utils.book_append_sheet(workbook, classWorksheet, classData.postCode)

                var workbookBuffer = xlsx.write(workbook, {
                    type: 'base64'
                });

                res.setHeader('Content-Length', workbookBuffer.length);
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader('Content-Disposition', 'attachment; filename=' + query + '.xlsx');
                res.status(200)
                res.end(Buffer.from(workbookBuffer, 'base64'));

            })
            
        })

    })

})

app.get('/getStudent/:blogId/:id', (req, res) => {

    let studentId = req.params.id
    let blogId = req.params.blogId

    firebase.downloadData('classes/'+blogId+'/students/'+ studentId).then((studentData) => {

        return res.json(studentData)

    })

})

app.post('/uploadClass/:postId', (req, res) => {

    let data = JSON.parse(JSON.stringify(req.body))

    firebase.uploadData('classes/'+req.params.postId, data).then((error) => {
        
        if (error) {

            Utils.logError(error)
            
            res.status(505).send(req.body)

        } else {

            Utils.log(JSON.stringify({ header: req.headers, body: req.body }))

            res.status(200).send(req.body)
        }
    })
        
})

app.post('/updateKeywords/:blogId/:postId', (req, res) => {

    let blogId = req.params.blogId
    let postId = req.params.postId

    let keywords = JSON.parse(JSON.stringify(req.body))

    firebase.uploadData('classes/'+blogId+'/posts/'+postId+'/keywords/', keywords).then((error) => {
        
        if (error) {

            Utils.logError(error)
            
            res.status(505).send(req.body)

        } else {

            Utils.log(JSON.stringify({ header: req.headers, body: req.body }))

            professor.analyseBlog(blogId)

            res.status(200).send(req.body)
        }
    })
        
})

app.listen(port, hostname, () => {
	console.log('Server running at http://' + hostname + ':' + port + '/');
})
