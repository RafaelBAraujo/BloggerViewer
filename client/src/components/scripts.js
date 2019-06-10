export const expandDrawer = () => {
    document.getElementById("mySidenav").style.width = "34%"
}

export const closeDrawer = () => {
    document.getElementById("mySidenav").style.width = "0";
}

export const switchTab = (tab) => {
    
    let tabId = tab.target.id;
    console.log(tabId);

    if(tabId === "DiagramTab") {
        document.getElementById(tabId).className = "tab active-tab";
        document.getElementById("CommentsTab").className = "tab";
        switchView("diagram");
    }

    else {
        document.getElementById(tabId).className = "tab active-tab";
        document.getElementById("DiagramTab").className = "tab";
        switchView("comments");
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

export const search = (input) => {

    let keywords = input.target.value.split(' ')

    let contexts = document.getElementsByClassName('comment-content')

    for(let i = 0; i < contexts.length; ++i) {
        let context = contexts[i]
        let instance = new Mark(context)
        instance.unmark(options)
        instance.mark(keywords, options)
    }
    /*
    contexts.forEach(context => {
        let instance = new Mark(context)
        instance.unmark(options)
        instance.mark(keywords, options)
    })
    */
}

