import React, { Component } from 'react'

class RangeInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: this.props.min,
            initialValue: this.props.initialValue
        }

        this.updateValue = (value) => {
            this.setState({ value })
        }

        this.getInitialValue = () => {
            if(this.state.initialValue == null || typeof this.state.initialValue === 'undefined')
                return this.state.value
            else
                return this.state.initialValue
        }

    }

    render() {
        return (
            <div className="range-input">
                <label htmlFor={this.props.id}>{this.props.id+': ' + this.state.value}</label>
                <input type="range" value={this.getInitialValue()} class="custom-range" onChange={(event) => this.updateValue(event.target.value)} min={this.props.min} max={this.props.max} step="0.5" id={this.props.name} />
            </div>
        )
    }

}

export default RangeInput