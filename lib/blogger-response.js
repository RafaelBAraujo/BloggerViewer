const Utils = require('./utils')
const html2text = require('html2plaintext')

class BloggerResponse {

    constructor(blog, post, classroom, comments, postList, keywords) {

        this.blog = blog
        this.post = post
        this.post.keywords = keywords
        this.postCode = post.title.split(" ")[0]
        this.post.content = html2text(this.post.content)
        this.post.comments = Utils.parseReplies(comments)
        
        this.classroom = classroom
        console.log(classroom)

        //this.classroomViews = Utils.buildClassroomViews(this.post.comments, this.authors, this.classroom)
        this.postList = postList

    }

}

module.exports = BloggerResponse