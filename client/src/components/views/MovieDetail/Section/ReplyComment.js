import React, { useState, useEffect } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const [shown, setShown] = useState(false)
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)

    useEffect(() => {
        let commentNumber = 0;
        props.comments.map((comment) => {
            if(comment.responseTo === props.parentCommentId) {
                commentNumber++
            }
        })
        setChildCommentNumber(commentNumber)
    }, [props.comments, props.parentCommentId])

    const renderReplyComment = (parentCommentId) => {
        props.comments.map((comment, index) => (
            <React.Fragment key={index}>
                {comment.responseTo === parentCommentId &&
                    <div>
                        <SingleComment comment={comment} movieId={props.movieId} refreshFunction={props.refreshFunction} />
                        <ReplyComment comments={props.comments} parentCommentId={comment._id} movieId={props.movieId} refreshFunction={props.refreshFunction}/>
                    </div>
                } 
            </React.Fragment>
        ))
    }

    const onClickHandler = () => {
        setShown(!shown)
    }

    return (
        <div>
            {ChildCommentNumber > 0 && 
            <p style={{ fontSize: '14px', margin: 0, color: 'gray' }} onClick={onClickHandler}>
                 View {ChildCommentNumber} more comment(s)
            </p>
            }
            {shown && renderReplyComment(props.parentCommentId)}
        </div>
    )
}

export default ReplyComment
