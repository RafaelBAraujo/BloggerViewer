const Utils = require('./utils')
const Firebase = require('./firebase')
const BloggerRequestApi = require('./blogger-request')
const html2text = require('html2plaintext')

class Professor {

    constructor(firebase) {
        this.firebase = firebase
        this.students = {}
        this.studentsNames = {}
        this.parsedStudents = {}
        this.studentNameSet = new Set()
        this.studentIdSet = new Set()

        this.identifyCommentAuthor = (comment) => {

            let candidates = []
            let displayName = comment.author.displayName
            let ignore = new Set(['da', 'de', 'do', 'das', 'dos'])

            Object.keys(this.students).forEach((key) => {
                
                let studentName = this.students[key].name
                candidates[key] = { matchCount: 0 }

                studentName.split(' ').forEach((nameBit) => {
                    displayName.split(' ').forEach((displayNameBit) => {
                        if(!ignore.has(nameBit) && !ignore.has(displayNameBit)) {
                            if(nameBit === displayNameBit) {
                                candidates[key].matchCount++
                            }
                        }
                    })
                })

            })

            let electedStudent = {}
            let matchCount = 1
            Object.keys(candidates).forEach((key) => {
                if(candidates[key].matchCount > matchCount) {
                    electedStudent = this.students[key]
                    matchCount = candidates[key].matchCount
                }
            })

            return electedStudent
        }

        this.countKeywords = (keywords, comment) => {

            let keywordCount = {}
            keywords = Array.from(keywords)

            comment.content.split(' ').forEach((word) => {
                keywords.forEach((concept) => { // concept: ['word1', 'word2']
                    if(typeof keywordCount[keywords.indexOf(concept)] === 'undefined') {
                        keywordCount[keywords.indexOf(concept)] = { count: 0, fulfill: 0, score: 0 }
                    }
                    concept.forEach((conceptWord) => {
                        if(word === conceptWord) {
                            keywordCount[keywords.indexOf(concept)].count++
                            keywordCount[keywords.indexOf(concept)].fulfill = keywordCount[keywords.indexOf(concept)].count / concept.length
                        }
                    })
                    if(keywordCount[keywords.indexOf(concept)].count > 0) {
                        keywordCount[keywords.indexOf(concept)].score = 1
                    }
                })
            })

            // console.log(keywordCount)

            return keywordCount

        }

        this.countReferences = (comment) => {

            let counter = 0;

            counter += (comment.match(new RegExp("http://", "g")) || []).length
            counter += (comment.match(new RegExp("https://", "g")) || []).length

            return counter

        }

    }

    async analyseBlog(blogId) {

        console.log('analyseBlog: id: ' + blogId)
        let postList = await BloggerRequestApi.getPosts(blogId, false)
        this.studentsNames = await this.firebase.downloadData('classes/'+blogId+'/studentsNames/students/')
        
        this.studentsNames.forEach((student) => {
            this.parsedStudents[student.RA] = { name: student.Nome }
        })

        Object.keys(this.parsedStudents).forEach((key) => {
            this.studentIdSet.add(key)
            this.studentNameSet.add(this.parsedStudents[key].name)
        })

        let post = postList[0]

        let comments = await BloggerRequestApi.getCommentsByPost(blogId, post.id)
        post.keywords = new Set(await this.firebase.downloadData('classes/'+blogId+'/posts/'+post.id+'/keywords/'))
        if(typeof post.keywords === 'undefined' || post.keywords === null) { post.keywords = new Set() }
        comments = Utils.parseReplies(comments)
        this.analysePost(comments, blogId, post)
        
        // postList.forEach(async (post) => {
        //     let comments = await BloggerRequestApi.getCommentsByPost(blogId, post.id)
        //     post.keywords = new Set(await this.firebase.downloadData('classes/'+blogId+'/posts/'+post.id+'/keywords/'))
        //     if(typeof post.keywords === 'undefined' || post.keywords === null) { post.keywords = new Set() }
        //     comments = Utils.parseReplies(comments)
        //     this.analysePost(comments, blogId, post)
        // })

    }

    async analysePost(comments, blogId, post) {

        let students = await this.firebase.downloadData('classes/'+blogId+'/students/')

        if(typeof students !== 'undefined' && students !== null) {
            Object.keys(students).forEach((key) => {
                let analisou = 0
                let discutiu = 0
                let observou = 0
    
                if(typeof students[key].posts[post.id] !== 'undefined') {
                    analisou = students[key].posts[post.id].analisou
                    discutiu = students[key].posts[post.id].discutiu
                    observou = students[key].posts[post.id].observou
                }
                
                students[key].posts[post.id] = { analisou: analisou, 
                                                 discutiu: discutiu, 
                                                 observou: observou, 
                                                 nOfKeywords: 0,
                                                 comments: {},
                                                 numOfReferences: 0, 
                                                 numOfComments: 0, 
                                                 numOfReceivedAnswers: 0, 
                                                 numOfWrittenAnswers: 0 }
            })
        } else {    
            students = {}
        }

        comments.forEach((comment) => {

            let commentStudentKey = Utils.identifyStudent(this.parsedStudents, comment.author.displayName)
            if(commentStudentKey !== null && typeof comment.inReplyTo === 'undefined') {
                if(typeof students[commentStudentKey] === 'undefined') {
                    students[commentStudentKey] = { name: this.parsedStudents[commentStudentKey].name, posts: {} }
                }
                if(typeof students[commentStudentKey].posts[post.id] === 'undefined') {
                    students[commentStudentKey].posts[post.id] = { analisou: 0, discutiu: 0, observou: 0, comments: {}, numOfComments: 0, numOfReferences: 0, numOfReceivedAnswers: 0, numOfWrittenAnswers: 0 }
                }
                students[commentStudentKey].posts[post.id].numOfComments++
                students[commentStudentKey].posts[post.id].numOfReceivedAnswers += comment.replies.length

                students[commentStudentKey].posts[post.id].comments[comment.id] = { nOfKeywords: {} }
                students[commentStudentKey].posts[post.id].comments[comment.id].nOfKeywords = this.countKeywords(post.keywords, comment)
                students[commentStudentKey].posts[post.id].comments[comment.id].content = html2text(comment.content)
                students[commentStudentKey].posts[post.id].comments[comment.id].countWords = comment.content.split(' ').length
                students[commentStudentKey].posts[post.id].numOfReferences += this.countReferences(comment.content)
            }

            comment.replies.forEach((reply) => {
                console.log('dqdwqdq')
                let replyStudentKey = Utils.identifyStudent(this.parsedStudents, reply.author.displayName)
                console.log(replyStudentKey)
                if(replyStudentKey !== null) {
                    if(typeof students[replyStudentKey] === 'undefined') {
                        students[replyStudentKey] = { name: this.parsedStudents[replyStudentKey].name, posts: {} }
                    }
                    if(typeof students[replyStudentKey].posts[post.id] === 'undefined') {
                        students[replyStudentKey].posts[post.id] = { analisou: 0, discutiu: 0, observou: 0, comments: {}, numOfComments: 0, numOfReferences: 0, numOfReceivedAnswers: 0, numOfWrittenAnswers: 0 }
                    }
                    students[replyStudentKey].posts[post.id].numOfWrittenAnswers++
                    students[replyStudentKey].posts[post.id].comments[reply.id] = { nOfKeywords: {} }
                    students[replyStudentKey].posts[post.id].comments[reply.id].nOfKeywords = this.countKeywords(post.keywords, reply)
                    students[replyStudentKey].posts[post.id].comments[reply.id].content = html2text(reply.content)
                    students[replyStudentKey].posts[post.id].comments[reply.id].countWords = reply.content.split(' ').length
                    students[replyStudentKey].posts[post.id].numOfReferences += this.countReferences(reply.content)
                    if(replyStudentKey === commentStudentKey) {
                        students[commentStudentKey].posts[post.id].numOfReceivedAnswers--
                    }
                }
            })

        })

        console.log(students)

        this.firebase.uploadData('/classes/'+blogId+'/students/', students)

    }

    
}

module.exports = Professor 
