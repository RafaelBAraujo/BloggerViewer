class Classroom {

    constructor(postId, students) {

        this.postId = postId
        this.postUrl = null
        this.manager = {}
        this.students = students
        this.keywords = []

    }

    setUrl(url) {
        this.postUrl = url
    }

    setManager(manager) {
        this.manager = manager
    }

    setKeywords(keywords) {
        this.keywords.push(keywords)
    }

}

module.exports = Classroom