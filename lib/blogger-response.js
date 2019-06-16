const Utils = require('./utils')

class BloggerResponse {

    constructor(blog, post, comments, postList) {

        this.blog = blog
        this.post = post
        this.post.comments = Utils.parseReplies(comments)
        this.authors = Utils.parseAuthors(this.post.comments)
        this.classroom = Utils.buildClassroomViews(this.post.comments)
        this.postList = postList

    }

}

module.exports = BloggerResponse