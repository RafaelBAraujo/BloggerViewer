import React, { Component } from "react";

import '../../stylesheets/conceptsetup.css'

import Concept from '../organisms/Concept'

class ConceptSetup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            concepts: this.props.concepts,
            conceptRegex: {}
        }
    }

    render() {

        let key = 0
        return(
            <div className="concepts">
                <h1 className="concepts-header">Concepts</h1>

                <div className="concept-list">
                    {this.state.concepts.map((concept, index) => {
                        key++
                        return(
                            <Concept key={'concept'+key} index={index} conceptIndex={index} concept={concept} updateRegexList={this.props.updateRegexList} />
                        )
                    })}
                </div>
            </div>
        )

    }

}

export default ConceptSetup