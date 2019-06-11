import React, { Component } from 'react';

class Diagram extends Component {

    render() {
        return(
            <div id="diagram" className="diagram">

                <canvas id="diagramCanvas">

                </canvas>

            </div>
        )
    }
}

export default Diagram;