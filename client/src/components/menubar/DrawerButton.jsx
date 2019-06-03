import React, { Component } from 'react';

class DrawerButton extends Component {

    expandDrawer() {
        document.getElementById("mySidenav").style.width = "34%";
    }

    handleClick(e) {
        this.expandDrawer()
    }

    render() {
        return(
            <div id="postsDrawer" className="posts">
                <button className="drawer-button" onClick={this.handleClick.bind(this)}><i className="material-icons">menu</i></button>
            </div>
        )
    }

}

export default DrawerButton;