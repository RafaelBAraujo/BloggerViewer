import React, { Component } from 'react';

class Diagram extends Component {

    render() {
        return(
            <div id="diagram" className="diagram">

                <canvas id="diagramCanvas">

                </canvas>

                <div className="node">
                    <img src="profile_pic.png" alt="test" className="node-img rounded-circle"/>
                </div>

            </div>
        )
    }
}

export default Diagram;