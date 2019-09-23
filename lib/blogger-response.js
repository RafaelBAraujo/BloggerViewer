const Utils = require('./utils')
const html2text = require('html2plaintext')

class BloggerResponse {

    constructor(blog, post, classroom, comments, postList) {

        this.blog = blog
        this.post = post
        this.postCode = post.title.split(" ")[0]
        this.post.content = html2text(this.post.content)
        this.post.comments = Utils.parseReplies(comments)
        

        if(classroom == null) {
            this.classroom = { students: [] }
        }
        else {
            this.classroom = classroom
        }

        this.authors = Utils.parseAuthors(this.post.comments, this.classroom)
        this.classroomViews = Utils.buildClassroomViews(this.post.comments, this.authors, this.classroom)
        this.postList = postList

    }

}

module.exports = BloggerResponse