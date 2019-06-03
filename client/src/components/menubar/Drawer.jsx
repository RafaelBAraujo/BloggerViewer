import React, { Component } from 'react';

class Drawer extends Component {

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    handleClick(e) {
        this.closeNav()
    }

    onClick = (e) => {
        e.preventDefault()

    }

    render() {
        return(
            <div id="mySidenav" class="sidenav">
                <a class="closebtn" onClick={this.handleClick.bind(this)}><i class="material-icons">menu</i></a>
                <a class="post" >Post Title</a>
            </div>
        )
    }

}

export default Drawer;