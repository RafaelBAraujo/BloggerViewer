const html2text = require('html2plaintext')

class Utils {

    static parseAuthors(comments) {

        let authors = {}

        comments.forEach((comment) => {

            if(typeof authors[comment.author.id] === 'undefined') {

                authors[comment.author.id] = comment.author
                authors[comment.author.id].numComments = 1

            } else {

                authors[comment.author.id].numComments++

            }

        })

        let parsedAuthors = []

        for(let key in authors)
            parsedAuthors.push(authors[key])

        return parsedAuthors

    }

    static parseReplies(comments) {

        let checkedComments = {}
        let parsedComments = []

        comments.forEach((comment) => {

            if(typeof comment.inReplyTo === 'undefined') {
                
                if(typeof checkedComments[comment.id] === 'undefined') {

                    checkedComments[comment.id] = comment
                    checkedComments[comment.id].replies = []

                }

            }


        })

        comments.forEach((comment) => {

            if(typeof checkedComments[comment.id] === 'undefined') {

                if(typeof comment.inReplyTo !== 'undefined') {

                    checkedComments[comment.inReplyTo.id].replies.push(comment)

                }

            }

        })

        for(let key in checkedComments) {
            parsedComments.push(checkedComments[key])
        }

        return parsedComments

    }

    static buildClassoomViews(comments) {

        

    }

    static shortenAuthorName(name) {

        var names = name.split(' ')
    
        if(names.length > 1)
            return names[0] + ' ' + names[1].substring(0, 1) + '.'
        
        else if(names.length > 0 && names.length < 2)
            return names[0]
    
        else
            return 'Unknown'
    
    }
    

}

module.exports = Utils