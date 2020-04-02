import React from 'react'

import KeywordBadge from '../atoms/KeywordBadge'

const KeywordSetup = ({keywords}) => {

    return (
        <div className="keyword-setup">
            <h3>Palavras-chave</h3>
            <div className="email-input quick-style">
                <i className="material-icons">search</i>
                <input type="text" placeholder={''} />
            </div>
            <div className="keyword-list">
                {keywords.map((keyword) => {
                    return (
                        <KeywordBadge variant="secondary" keyword={keyword} />
                    )
                })}
            </div>
        </div>
    )

}

export default KeywordSetup