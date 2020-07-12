import Axios from 'axios';

// const server = 'beatlesdosdomingos.ddns.net'
// const serverPort = '5000'
const server = '192.168.15.13'
const serverPort = '5000'

export const goToPreviousPage = () => {
    window.history.back()
}

export const expandDrawer = () => {
    document.getElementById("mySidenav").style.width = "34%"
}

export const closeDrawer = () => {
    document.getElementById("mySidenav").style.width = "0";
}

export const switchView = (selectedView) => {

    let blogView = document.getElementById("comments")
    let classroomView = document.getElementById("diagram")
    let dashboardView = document.getElementById("dashboard")

    if(!blogView.classList.contains('hide-view')) {
        blogView.classList.toggle('hide-view')
    }
    
    if(!classroomView.classList.contains('hide-view')) {
        classroomView.classList.toggle('hide-view')
    }

    if(!dashboardView.classList.contains('hide-view')) {
        dashboardView.classList.toggle('hide-view')
    }

    if(selectedView === 'dashboard') {
        dashboardView.classList.toggle('hide-view')
    } else if(selectedView === 'classroomView') {
        classroomView.classList.toggle('hide-view')
    } else if(selectedView === 'blogView') {
        blogView.classList.toggle('hide-view')
    }
    
}

export const switchTab = (tab) => {
    
    let tabId = tab.target.id

    if(tabId === "ClassroomTab") {

        document.getElementById(tabId).classList.toggle('active-tab')
        document.getElementById("SetupTab").classList.toggle('active-tab')
        switchView('blogView')

    } else if(tabId === "SetupTab") {

        document.getElementById(tabId).classList.toggle('active-tab')
        document.getElementById("ClassroomTab").classList.toggle('active-tab')
        switchView('classroomView')

    }

}

var Mark = require('mark.js')

const options = { "element": "mark", "className": "", "exclude": [], "separateWordSearch": true, "accuracy": "partially", "diacritics": true, "synonyms": {}, "iframes": false, "iframesTimeout": 5000, "acrossElements": false, "caseSensitive": false, "ignoreJoiners": false, "ignorePunctuation": [], "wildcards": "disabled", "each": function(node){}, "filter": function(textNode, foundTerm, totalCounter, counter){ return true; }, "noMatch": function(term){}, "done": function(counter){}, "debug": false, "log": window.console }

export const highlight = async (keywords) => {

    let contexts = document.querySelectorAll('.comment-content')

    contexts.forEach( async (context) => {
        let instance = new Mark(context)
        instance.unmark(options)
        context.parentElement.parentElement.style.zIndex = '0'
        context.parentElement.parentElement.style.height = 'auto'
        context.parentElement.parentElement.style.opacity = '1'
        if(keywords !== '') {
            await instance.mark(keywords, options)
            let marks = context.querySelectorAll('mark')
    
            if(marks.length === 0) {
                if((!context.parentElement.classList.contains('response')) && context.parentElement.parentElement.style.opacity !== '0') {
                    context.parentElement.parentElement.style.height = '0px'
                    context.parentElement.parentElement.style.zIndex = '-10'
                    context.parentElement.parentElement.style.opacity = '0'
                }
            } else {

            }

        }


    })
    
}

const showFilter = (element) => {

    let filter = document.getElementsByClassName('filtersign')[0]

    filter.querySelectorAll('.filter-element')[0].innerHTML = element

    if(filter.classList.contains('hide-filtersign'))
        filter.classList.toggle('hide-filtersign')

}

const hideFilter = () => {

    let filter = document.getElementsByClassName('filtersign')[0]

    if(!filter.classList.contains('hide-filtersign'))
        filter.classList.toggle('hide-filtersign')

}

export const clearMarks = () => {

    let comments = document.querySelectorAll('.comment-header')

    // show all
    comments.forEach((comment) => {
        if(comment.parentElement.parentElement.style.opacity === '0') {
            comment.parentElement.parentElement.style.height = 'auto'
            comment.parentElement.parentElement.style.zIndex = '0'
            comment.parentElement.parentElement.style.opacity = '1'
        }

        if(comment.parentElement.classList.contains('response')) {
            comment.parentElement.style.height = 'auto'
            comment.parentElement.style.zIndex = '0'
            comment.parentElement.style.opacity = '1'
            comment.parentElement.style.display = 'block'
        }

    })

}

export const cleanFilter = () => {

    clearMarks()

    hideFilter()

}

export const filterCommentsByAuthor = (authorName) => {

    let comments = document.querySelectorAll('.comment-header')

    clearMarks()

    // hide specific
    comments.forEach((comment) => {

        let hasRepliesByAuthor = false

        let replies = comment.parentElement.querySelectorAll('div.collapse div.response')

        for(let i = 0; i < replies.length; ++i) {
            if(replies[i].querySelector('.comment-header .profile-name p').innerHTML === authorName) {
                hasRepliesByAuthor = true
                break;
            }
        }


        if(!hasRepliesByAuthor) {
            if(comment.querySelector('.profile-name p').innerHTML !== authorName) {
                if(!comment.parentElement.classList.contains('response') && comment.parentElement.parentElement.style.opacity !== '0') {
                    comment.parentElement.parentElement.style.height = '0px'
                    comment.parentElement.parentElement.style.zIndex = '-10'
                    comment.parentElement.parentElement.style.opacity = '0'
                }
            }
        }

        for(let i = 0; i < replies.length; ++i) {

            if(replies[i].querySelector('.comment-header .profile-name p').innerHTML !== authorName) {
                replies[i].style.height = '0px'
                replies[i].style.zIndex = '-10'
                replies[i].style.opacity = '0'
                replies[i].style.display = 'none'
            }

        }

    })

    showFilter(authorName)

}

export const setManager = (manager) => {

    let name = manager.split(',')[1]
    name = name.substr(1, name.length)
    console.log('name:' + name)

    let comments = document.querySelectorAll('.comment-header')

    // first, reset
    comments.forEach((comment) => {

        if(comment.parentElement.classList.contains('manager-comment')) {
            comment.parentElement.classList.toggle('manager-comment')
        }

    })


    // and then mark managers
    comments.forEach((comment) => {

        if(comment.querySelector('.profile-name p').innerHTML === name) {

            comment.parentElement.classList.toggle('manager-comment')

        }

    })

}

export const openStudentComponent = (event) => {

    document.getElementById('students').style.transition = '1s'
    document.getElementById('students').style.width = '100%'


    document.getElementById('student').style.transition = '1s'
    document.getElementById('students').style.width = '0.1px'
    document.getElementById('students').style.display = 'none'
    document.getElementById('student').style.width = '100%'

}

export const closeStudentComponent = (event) => {

    document.getElementById('student').style.width = '0%;'

    document.getElementById('students').style.width = '18%'
    document.getElementById('students').style.display = 'block'

}

export const rotateIcon = () => {

    event.target.lastElementChild.classList.toggle('rotate')

}

export const search = (input) => {

    highlight(input.target.value)

}

export const validateBlogUrl = (blogUrl) => {

    let isValid = true

    if(typeof blogUrl === 'undefined' || blogUrl === null || blogUrl === '') {
        isValid = false  
    } 
    else {
        if((blogUrl.match(new RegExp(".blogspot.", "g")) || []).length === 0 ||
           ((blogUrl.match(new RegExp("http://", "g")) || []).length === 0 && 
            (blogUrl.match(new RegExp("https://", "g")) || []).length === 0) ||
            (blogUrl.match(new RegExp(".com", "g")) || []).length === 0) {
            isValid = false
        }
    }

    return isValid

}

export const fetchBlog = async (blogUrl) => {

    //console.log(JSON.parse(JSON.stringify(blogUrl)))

    let res = await fetch('http://'+server+':'+serverPort+'/getBlogInfo/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: '{"blogUrl":"'+blogUrl+'"}'
    })

    return res

}

export const fetchPostById = async (blogId, postId) => {

    let res = await fetch('http://'+server+':'+serverPort+'/getPostInfo/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: '{"blogId":"'+blogId+'", "postId": "'+postId+'"}'
    })

    return res

}

export const fetchPost = async (postId) => {

    let res = await fetch('/visualizer/getLastPost')
    console.log('res: ' + res)

    let data = await res.json()
    console.log('data: ' + data)

    return data

}

import axios from 'axios'

export const uploadSpredsheet = async (file, fileName, blogId) => {

    const data = new FormData()

    data.append('file', file, fileName)

    Axios.toString()

    let res = await axios.post("http://"+server+":"+serverPort+"/uploadSpreadsheet/" + blogId, data, {})

    return res

}

export const uploadConceptsFile = async (file, fileName, blogId, postId) => {

    const data = new FormData()

    data.append('file', file, fileName)

    Axios.toString()

    let res = await axios.post("http://"+server+":"+serverPort+"/uploadConcepts/"+blogId+'/'+postId, data, {})

    return res

}

export const downloadFile = async (fileName) => {

    let file = await setTimeout(() => {

        const response = {
            file: 'http://'+server+':'+serverPort+'/getSpreadSheet/' + fileName
        }

        return response.file

    }, 100)

    return file

}

export const uploadClass = async (data, postId) => {

    let res = await fetch('http://'+server+':'+serverPort+'/uploadClass/' + postId, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    return res

}

export const updateKeywords = async (blogId, postId, keywords) => {

    let res = await fetch('http://'+server+':'+serverPort+'/updateKeywords/'+blogId+'/'+postId+'/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(keywords)
    })

    return res

}

export const getStudentData = async (blogId, studentId) => {

    let res = await fetch('http://'+server+':'+serverPort+'/getStudent/'+blogId+'/'+studentId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })

    return res

}

export const analyseBlog = async (blogId) => {

    let res = await fetch('http://'+server+':'+serverPort+'/analyseBlog/' + blogId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })

    return res

}

export const sendRegexList = async (blogId, postId, regexList) => {

    console.log(JSON.stringify(regexList))
    let res = await fetch('http://'+server+':'+serverPort+'/updateRegex/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            blogId: blogId,
            postId: postId,
            regexList: regexList
        })
    })

    return res

}

export const shortenAuthorName = (name) => {

    var names = name.split(' ')

    if(names.length > 1)
        return names[0] + ' ' + names[names.length-1]
    
    else if(names.length > 0 && names.length < 2)
        return names[0]

    else
        return 'Unknown'

}