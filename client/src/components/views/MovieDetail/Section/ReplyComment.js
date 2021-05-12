import React, { useState, useEffect } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const [shown, setShown] = useState(false)
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)

    useEffect(() => {
        let commentNumber = 0;
        props.comments.map((comment) => {
            console.log(comment._id)
            if(comment.responseTo === props.parentCommentId) {
                commentNumber++
            }
        })
        setChildCommentNumber(commentNumber)
    }, [props.comments, props.parentCommentId])

    const renderReplyComment = (parentCommentId) => 
        props.comments.map((comment, index) => (
            <React.Fragment>
                {comment.responseTo === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: '40px' }}>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} setShown={setShownHandler}/>
                        <ReplyComment comments={props.comments} parentCommentId={comment._id} postId={props.postId} refreshFunction={props.refreshFunction} />
                    </div>
                }
            </React.Fragment>
        ))
            
    const setShownHandler = () => {
        setShown(!shown)
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
