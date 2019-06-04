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
            <div id="mySidenav" className="sidenav">
                <a className="closebtn" onClick={this.handleClick.bind(this)}><i className="material-icons">menu</i></a>
                <a className="post" >Post Title</a>
            </div>
        )
    }

}

export default Drawer;