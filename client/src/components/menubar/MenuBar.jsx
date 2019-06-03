import React, { Component } from 'react';

class MenuBar extends Component {


    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: null,
        };
    }

    selectTab(tabId) {

        if(tabId === "commentTab") {
            document.getElementById(tabId).className = "tab active-tab";
            document.getElementById("diagramTab").className = "tab";
            this.switchView("comments");
        }
    
        else {
            document.getElementById(tabId).className = "tab active-tab";
            document.getElementById("commentTab").className = "tab";
            this.switchView("diagram");
        }
    
    }
    
    switchView(view) {
    
        if(view === "comments") {
            document.getElementById("comments").style.display = "block";
            document.getElementById("diagram").style.display = "none";
        }
        else if(view === "diagram") {
            document.getElementById("comments").style.display = "none";
            document.getElementById("diagram").style.display = "block";
        }
        
    }

    handleClick(e) {
        this.selectTab(e.target.id);
    }
    
    render() {
        return(
            <div className="tabs">
                <button id="diagramTab" className="tab" onClick={this.handleClick.bind(this)}>Diagram</button>
                <button id="commentTab" className="tab active-tab" onClick={this.handleClick.bind(this)} >Comments</button>
            </div>
        );
    }
}

export default MenuBar;