import React, { Component } from "react";

import '../../stylesheets/conceptsetup.css'

import Concept from '../organisms/Concept'

class ConceptSetup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            concepts: this.props.concepts,
            filteredConcepts: this.props.concepts,
            conceptRegex: {}
        }

        this.queryStudent = (input) => {

            let query = input.target.value
            let filteredConcepts = []

            if(query !== "") {
                this.state.concepts.forEach((concept) => {
                    if(concept.keyword.match(new RegExp(query, 'gi'))) {
                        filteredConcepts.push(concept)
                    }
                })
                this.setState({
                    filteredConcepts: filteredConcepts
                })
            }
            else {
                this.setState({
                    filteredConcepts: this.state.concepts
                })
            }

        }
    }

    render() {

        let key = 0
        return(
            <div className="concepts">
                <div className="concepts-header">
                    <h1>Conceitos</h1>
                    <div className="email-input quick-style">
                        <i className="material-icons">search</i>
                        <input type="text" placeholder={''} onKeyUp={this.queryStudent} />
                    </div>
                </div>

                <div className="concept-list">
                    {this.state.filteredConcepts.map((concept, index) => {
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