import React from 'react'

import CommentPicture from '../atoms/CommentPicture'
import RangeInput from '../atoms/RangeInput'

const StudentView = ({student}) => {

    return(
        <div className="student-view">
            <CommentPicture src={'http://lh3.googleusercontent.com/zFdxGE77vvD2w5xHy6jkVuElKv-U9_9qLkRYK8OnbDeJPtjSZ82UPq5w6hJ-SA=s35'} alt={'http://lh3.googleusercontent.com/zFdxGE77vvD2w5xHy6jkVuElKv-U9_9qLkRYK8OnbDeJPtjSZ82UPq5w6hJ-SA=s35'} />
            <RangeInput id={'Observou'} initialValue={student.B} min={0} max={3.5} />
            <RangeInput id={'Discutiu'} initialValue={student.S} min={4} max={7.5} />
            <RangeInput id={'Analisou'} initialValue={student.M} min={8} max={10} />
        </div>
    )

}

export default StudentView