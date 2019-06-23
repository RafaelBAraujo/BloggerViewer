import Axios from 'axios';

export const expandDrawer = () => {
    document.getElementById("mySidenav").style.width = "34%"
}

export const closeDrawer = () => {
    document.getElementById("mySidenav").style.width = "0";
}

export const switchTab = (tab) => {
    
    let tabId = tab.target.id

    if(tabId === "ClassroomTab") {
        document.getElementById(tabId).className = "tab active-tab"
        document.getElementById("CommentsTab").className = "tab"
        switchView("diagram")
    }

    else {
        document.getElementById(tabId).className = "tab active-tab"
        document.getElementById("ClassroomTab").className = "tab"
        switchView("comments")
    }

}

function switchView(view) {
    
    if(view === "comments") {
        document.getElementById("comments").style.display = "block";
        document.getElementById("diagram").style.display = "none";
    }
    else if(view === "diagram") {
        document.getElementById("comments").style.display = "none";
        document.getElementById("diagram").style.display = "block";
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
                if((!comment.parentElement.classList.contains('response')) && comment.parentElement.parentElement.style.opacity !== '0') {
                    comment.parentElement.parentElement.style.height = '0px'
                    comment.parentElement.parentElement.style.zIndex = '-10'
                    comment.parentElement.parentElement.style.opacity = '0'
                }
            }
        }
        
    })

    showFilter(authorName)

}

export const rotateIcon = () => {

    event.target.lastElementChild.classList.toggle('rotate')

}


export const search = (input) => {

    highlight(input.target.value)

}

export const fetchPost = async (postId) => {

    let res = await fetch('/visualizer/getLastPost')
    console.log('res: ' + res)

    let data = await res.json()
    console.log('data: ' + data)

    return data

}

import axios from 'axios'

export const uploadFile = async (file, fileName) => {

    const data = new FormData()
    console.log(file.name)
    console.log(file.path)

    data.append('file', file, fileName)

    Axios.toString()
    axios.post("http://localhost:5000/upload", data, { // receive two parameter endpoint url ,form data 
      })
      .then(res => { // then print response status
        console.log(res.statusText)
    })


}

export const uploadClass = async (data) => {

    fetch('http://localhost:5000/uploadClass', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    })

}