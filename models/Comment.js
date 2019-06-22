const Utils = require('../lib/utils')

class Comment {

    constructor(bloggerComment) {

        this.kind = bloggerComment.kind
        this.status = 'Need OAuth' //bloggerComment.status
        this.id = bloggerComment.id
        this.inReplyTo = {
            id: bloggerComment.inReplyTo.id
        }
        this.post = {
            id: bloggerComment.post.id
        }
        this.blog = {
            id: bloggerComment.blog.id
        }
        this.published = bloggerComment.published
        this.updated = bloggerComment.updated
        this.selfLink = bloggerComment.selfLink
        this.author = {
            id: bloggerComment.selfLink.author.id,
            displayName: Utils.shortenAuthorName(bloggerComment.author.displayName.toString()),
            url: bloggerComment.author.url,
            image: {
                url: bloggerComment.image.url
            }
        }
        /*
        "content": string,
        "author": {
            "id": string,
            "displayName": string,
            "url": string,
            "image": {
            "url": string
            }
        }
        */

    }

}

module.exports = Comment