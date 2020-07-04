import React, { Component } from 'react'
import ConceptInput from '../molecules/ConceptInput'

class Concept extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            concept: this.props.concept,
            conceptIndex: this.props.conceptIndex,
            regexList: this.props.concept.regexList,
            test: 0
        }
    }

    showAddButton = () => {
        let addBtn = document.getElementById(this.props.conceptIndex+'add-btn')
        let remBtn = document.getElementById(this.props.conceptIndex+'rem-btn')
        addBtn.classList.toggle('hidden-button')
        remBtn.classList.toggle('hidden-button')
    }

    hideAddButton = () => {
        let addBtn = document.getElementById(this.props.conceptIndex+'add-btn')
        let remBtn = document.getElementById(this.props.conceptIndex+'rem-btn')
        addBtn.classList.toggle('hidden-button')
        remBtn.classList.toggle('hidden-button')
    }

    addRegex = () => {
        let {regexList} = this.state
        regexList.push('')
        this.setState({ regexList: regexList })
        console.log(this.state.regexList)
    }

    removeRegex = () => {
        let {regexList} = this.state
        if(regexList.length > 0) {
            regexList.pop()
            this.setState({ regexList: regexList })
            this.props.updateRegexList(this.state.concept.keyword, regexList)
        }
    }

    saveRegex = (event, weight) => {
        let { regexList } = this.state
        console.log('weight: ' + weight)
        regexList[event.target.id] = { regex: event.target.value, weight: weight, options: { sameSentence: false } }
        this.setState({ regexList: regexList })
        this.props.updateRegexList(this.state.concept.keyword, regexList)
    }

    updateWeight = (id, weight) => {
        let { regexList } = this.state
        console.log(weight)
        regexList[id].weight = weight
        this.setState({ regexList: regexList })
        this.props.updateRegexList(this.state.concept.keyword, regexList)
    }

    render() {
        return(
            <div id={this.state.id} className="concept" onMouseOver={this.showAddButton} onMouseOut={this.hideAddButton} >
                <input className="concept-display" type="text" readOnly={true} value={this.state.concept.keyword}/>
                {this.state.regexList.map((el, i) => {
                    return(
                        <ConceptInput id={i} key={i} weight={el.weight} regex={el.regex} concept={this.state.concept} updateWeight={this.updateWeight} saveRegex={this.saveRegex} />
                    )
                })}
                <input type="button" id={this.props.conceptIndex+'add-btn'} className="hidden-button concept-btn btn-secondary" onClick={this.addRegex} value={'+'} />
                <input type="button" id={this.props.conceptIndex+'rem-btn'} className="hidden-button concept-btn btn-secondary" onClick={this.removeRegex} value={'-'} />
            </div>
        )
    }

}

export default Concept