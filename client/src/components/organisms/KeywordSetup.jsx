import React, { Component } from 'react'

import KeywordBadge from '../atoms/KeywordBadge'

import { updateKeywords } from '../scripts'

class KeywordSetup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            keywords: this.props.keywords
        }

        this.updateKeywordsAction = (input) => {
            if(input.key === 'Enter') {
                let newKeyword = input.target.value
                let currentKeywords = this.state.keywords
                if(!currentKeywords.includes(newKeyword)) {
                    currentKeywords.push(newKeyword.toLowerCase())
                    updateKeywords(this.props.blogId, this.props.postId, currentKeywords)
                    this.setState({keywords: currentKeywords})
                }
            }
        }

        this.deleteKeywordsAction = (keyword) => {
            let currentKeywords = this.state.keywords
            if(currentKeywords.includes(keyword)) {
                currentKeywords.splice(currentKeywords.indexOf(keyword), 1)
                updateKeywords(this.props.blogId, this.props.postId, currentKeywords)
                this.setState({keywords: currentKeywords})
            }
        }
    }
    
    render() {
        return (
            <div className="keyword-setup">
                <h3>Palavras-chave</h3>
                <div className="email-input quick-style">
                    <i className="material-icons">search</i>
                    <input type="text" placeholder={''} onKeyDown={this.updateKeywordsAction}/>
                </div>
                <div className="keyword-list">
                    {this.state.keywords.map((keyword) => {
                        return (
                            <KeywordBadge variant="secondary" keyword={keyword} deleteKeywordAction={this.deleteKeywordsAction}/>
                        )
                    })}
                </div>
            </div>
        )
    }

}

export default KeywordSetup