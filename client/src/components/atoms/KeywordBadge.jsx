import React from 'react';

import Badge from 'react-bootstrap/Badge'
import IconButton from './IconButton';

const KeywordBadge = ({variant, keyword, deleteKeywordAction}) => {

    return(
        <div className="keyword-badge">
            <h4>
                <Badge variant={variant}>{keyword}</Badge>
            </h4>
            <IconButton icon={'close'} onClick={() => deleteKeywordAction(keyword)} />
        </div>
    )

}

export default KeywordBadge