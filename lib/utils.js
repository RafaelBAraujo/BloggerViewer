const html2text = require('html2plaintext')

const Classroom = require('./classroom')

class Utils {

    static parseAuthors(comments) {

        let authors = {}

        comments.forEach((comment) => {

            if(typeof authors[comment.author.displayName] === 'undefined') {

                authors[comment.author.displayName] = comment.author
                authors[comment.author.displayName].numComments = 1

            } else {

                authors[comment.author.displayName].numComments++

            }

            comment.replies.forEach((reply) => {

                if(typeof authors[reply.author.displayName] === 'undefined') {

                    authors[reply.author.displayName] = reply.author
                    authors[reply.author.displayName].numReplies = 1
    
                } else {
    
                    authors[reply.author.displayName].numReplies++
    
                }

            })

        })

        let parsedAuthors = []

        for(let key in authors) {
            parsedAuthors.push(authors[key])
        }

        return parsedAuthors

    }

    static parseReplies(comments) {

        let checkedComments = {}
        let parsedComments = []

        comments.forEach((comment) => {

            if(typeof comment.inReplyTo === 'undefined') {
                
                if(typeof checkedComments[comment.id] === 'undefined') {

                    comment.content = html2text(comment.content)
                    checkedComments[comment.id] = comment
                    checkedComments[comment.id].replies = []

                }

            }


        })

        comments.forEach((comment) => {

            if(typeof checkedComments[comment.id] === 'undefined') {

                if(typeof comment.inReplyTo !== 'undefined') {

                    comment.content = html2text(comment.content)
                    checkedComments[comment.inReplyTo.id].replies.push(comment)

                }

            }

        })

        for(let key in checkedComments) {
            parsedComments.push(checkedComments[key])
        }

        return parsedComments

    }

    static buildClassroomViews(comments, authors, classroom) {

        let classroomViews = [ { id: 'ncomments', title: 'Número de Comentários', content: [] },
                               { id: 'interactions', title: 'Interações', content: [] },
                               { id: 'inactives', title: 'Inativos', content: [] } ]

        if(classroom == null) {
            classroomViews.forEach((view) => { view.content.push({ displayName: 'Planilha não encontrada.', url: '', image: {url: ''} }) })
            return classroomViews
        }

        let authorsSet = new Set()
        let studentsSet = new Set()

        classroom.students.forEach((student) => { studentsSet.add(student.Nome) })
        authors.forEach((author) => { authorsSet.add(author.displayName) })

        authors.forEach((author) => {

            if(studentsSet.has(author.displayName)) {
                // for those that have commented
                if(author.numComments > 0) {
                    classroomViews[0].content.push(author)
                }

                // for those that "interacted"
                if(author.numReplies > 0) {
                    classroomViews[1].content.push({
                        displayName: author.displayName,
                        url: author.url,
                        numComments: author.numReplies,
                        image: {
                            url: author.image.url
                        }
                    })
                }

            }

        })

        classroom.students.forEach((student) => {
            
            // for those that have not commented
            if(!authorsSet.has(student.Nome)) {

                classroomViews[2].content.push({
                    displayName: this.shortenAuthorName(student.Nome),
                    url: 'Inactive student',
                    numComments: null,
                    image: {
                        url: '//lh3.googleusercontent.com/zFdxGE77vvD2w5xHy6jkVuElKv-U9_9qLkRYK8OnbDeJPtjSZ82UPq5w6hJ-SA=s35'
                    }
                })

            }

        })

        return classroomViews

    }

    static filterStudents(json) {

        let cleansedJson = null

        let objList = JSON.parse(json)

        let students = []

        objList.forEach((obj) => {
            if(typeof obj.RA !== 'undefined') {
                let newStudent = {
                    RA: obj.RA,
                    Nome: obj.Nome,
                    B: null,
                    S: null,
                    M: null
                }
                students.push(newStudent)
            }
        })

        return students

    }

    static shortenAuthorName(name) {

        var names = name.split(' ')
    
        if(names.length > 1)
            return names[0] + ' ' + names[1]
        
        else if(names.length > 0 && names.length < 2)
            return names[0]
    
        else
            return 'Unknown'
    
    }
    

}

module.exports = Utils