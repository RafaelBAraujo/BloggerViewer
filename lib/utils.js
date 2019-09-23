const html2text = require('html2plaintext')
const xlsx = require('xlsx')
const fs = require('fs')

const Classroom = require('./classroom')

class Utils {

    static parseAuthors(comments, classroom) {

        let authors = {}
        let studentsSet = new Set()

        classroom.students.forEach((student) => { studentsSet.add(student.Nome) })

        comments.forEach((comment) => {

            if(typeof authors[comment.author.displayName] === 'undefined' && studentsSet.has(comment.author.displayName)) {

                authors[comment.author.displayName] = comment.author
                authors[comment.author.displayName].numOfRepliesReceived = 0
                authors[comment.author.displayName].numComments = 1
                authors[comment.author.displayName].numReplies = 0
                authors[comment.author.displayName].numOfRepliesReceived += comment.numOfRepliesReceived

            } else if(typeof authors[comment.author.displayName] !== 'undefined'){

                authors[comment.author.displayName].numComments++
                authors[comment.author.displayName].numOfRepliesReceived += comment.numOfRepliesReceived

            }

            comment.replies.forEach((reply) => {

                if(typeof authors[reply.author.displayName] === 'undefined' && studentsSet.has(comment.author.displayName)) {

                    authors[reply.author.displayName] = reply.author
                    authors[reply.author.displayName].numComments = 0
                    authors[reply.author.displayName].numOfRepliesReceived = 0
                    authors[reply.author.displayName].numReplies = 1
    
                } else if(typeof authors[reply.author.displayName] !== 'undefined'){
    
                    authors[reply.author.displayName].numReplies++
    
                }

            })

        })

        let parsedAuthors = []

        for(let key in authors) {
            parsedAuthors.push(authors[key])
        }

        console.log(parsedAuthors)

        return parsedAuthors

    }

    static parseReplies(comments) {

        let checkedComments = {}
        let parsedComments = []

        comments.forEach((comment) => {

            if(typeof comment.inReplyTo === 'undefined') {
                
                if(typeof checkedComments[comment.id] === 'undefined') {

                    let content = html2text(comment.content)
                    
                    if(content !== 'Este comentário foi removido pelo autor.') {
                        comment.content = content
                        checkedComments[comment.id] = comment
                        checkedComments[comment.id].replies = []
                        checkedComments[comment.id].numOfRepliesReceived = 0
                    }


                }

            }


        })

        comments.forEach((comment) => {

            if(typeof checkedComments[comment.id] === 'undefined') {

                if(typeof comment.inReplyTo !== 'undefined') {

                    let content = html2text(comment.content)

                    if(content !== 'Este comentário foi removido pelo autor.') {
                        comment.content = content
                        checkedComments[comment.inReplyTo.id].replies.push(comment)
                        checkedComments[comment.inReplyTo.id].numOfRepliesReceived++
                    }

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

        classroom.students.forEach((student) => { studentsSet.add(student.Nome); console.log(student.RA) })
        authors.forEach((author) => { authorsSet.add(author.displayName) })

        let ignore = new Set(['da', 'de', 'do', 'das', 'dos'])

        authors.forEach((author) => {

            studentsSet.forEach((wholeName) => {

                let displayName = author.displayName
                
                let displayNames = displayName.split(' ')

                let names = wholeName.split(' ')

                let numOfMatches = 0
                let matches = []

                displayNames.forEach((displayedNameBit) => {

                    names.forEach((name) => {

                        if(!ignore.has(name.toLowerCase())) {
                            if(displayedNameBit === name) {
    
                                numOfMatches++
                                matches.push(name)
    
                            }
                        }

                    })

                })

            })

        })

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

        classroomViews[0].content = this.sortClassroom(classroomViews[0].content)
        classroomViews[1].content = this.sortClassroom(classroomViews[1].content)

        return classroomViews

    }

    static filterStudents(json) {

        let objList = JSON.parse(json)

        let students = []

        objList.forEach((obj) => {
            if(typeof obj.RA !== 'undefined') {
                let newStudent = {
                    RA: obj.RA,
                    Nome: obj.Nome,
                    B: 0,
                    S: 0,
                    M: 0
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

    static sortClassroom(list) {

        let listSize = list.length

        for(let n = 0; n < listSize-1; n++) {
            for(let i = 0; i < listSize-n-1; ++i) {                

                if(list[i+1].numComments > list[i].numComments) {

                    let biggerValue = list[i+1]
                    list[i+1] = list[i]
                    list[i] = biggerValue

                }
        
            }
        }

        return list

    }

    static logError(error) {

        let now = new Date();
        let timeString = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDay() + 'AT' + now.getHours()+now.getMinutes()+now.getSeconds()

        fs.writeFile('./private/log/error/' + timeString + '.error.log', JSON.stringify(error), 'utf-8', (err, result) => {
            if(err) console.log(err)
        })

    }

    static log(log) {

        let now = new Date();
        let timeString = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDay() + 'AT' + now.getHours()+now.getMinutes()+now.getSeconds()

        fs.writeFile('./private/log/request/' + timeString + '.request.log', log, 'utf-8', (err, result) => {
            if(err) console.log(err)
        })

    }

    static class_to_sheet(classData) {

        let header = {header:["RA", "Nome", "B", "S", "M"]}

        let data = []

        classData.students.forEach((student) => {

            data.push({
                RA: student.RA,
                Nome: student.Nome,
                B: student.B,
                S: student.S,
                M: student.M
            })

        })

        return xlsx.utils.json_to_sheet(data, header)

    }

}

module.exports = Utils
