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

export const search = () => {

    console.log('hey, it has changed; BUT I\'M THE ONE WHO NEEDS CHANGING');

}