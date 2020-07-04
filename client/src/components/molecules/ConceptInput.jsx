import React, { Component } from 'react'

class ConceptInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            concept: this.props.concept,
            weight: this.props.weight
        }
    }

    showConfigButton = () => {
        let btn = document.getElementById(this.props.concept.keyword+this.props.id+'config-btn')
        btn.classList.toggle('hidden-button')
    }

    hideConfigButton = () => {
        let btn = document.getElementById(this.props.concept.keyword+this.props.id+'config-btn')
        btn.classList.toggle('hidden-button')
    }

    render() {
        return(
            <div className="concept-input" onMouseOver={this.showConfigButton} onMouseOut={this.hideConfigButton}>
                <div id={this.props.concept.keyword+this.props.id+'config-btn'} className="concept-config-btn hidden-button" >
                    <p>peso: </p>
                    <input type="number" step="0.1" defaultValue={this.props.weight} onChange={(event) => this.props.updateWeight(this.props.id, event.target.value)} />
                </div>
                {/* <button id={this.props.concept.keyword+this.props.id+'config-btn'} className="concept-config-btn hidden-button btn-secondary" onClick={this.addRegex} ><i className="material-icons">settings</i></button> */}
                <input id={this.props.id} defaultValue={this.props.regex} onChange={(event) => {this.props.saveRegex(event, this.state.weight)}} type="text" />
            </div>
        )
    }
    
}

export default ConceptInput