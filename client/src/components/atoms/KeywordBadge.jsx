import React from 'react';

import Badge from 'react-bootstrap/Badge'
import IconButton from './IconButton';

const KeywordBadge = ({variant, keyword}) => {

    return(
        <div className="keyword-badge">
            <h4>
                <Badge variant={variant}>{keyword}</Badge>
            </h4>
            <IconButton icon={'close'} />
        </div>
    )

}

export default KeywordBadge