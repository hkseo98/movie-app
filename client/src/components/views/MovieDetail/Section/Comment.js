import React, { useState } from 'react'
import { Button, Input, Typography } from 'antd'
import axios from 'axios'
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'
const { TextArea } = Input
const { Title} = Typography

function Comment(props) {

    const user = useSelector(state => state.user)
    const [commentValue, setCommentValue] = useState("")

    const handleChange = (event) => {
        setCommentValue(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        
        let variables = {
            content: commentValue,
            writer: user.userData._id,
            movieId: props.movieId
        }

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.result)
                    props.refreshFunction(response.data.result)
                    setCommentValue("")
                } else {
                    alert('failed saving comment')
                }
            })
    }

    return (
        <div>
            <br />
            <p> Reples </p>
            <hr />
            {/* Comment Lists */}

            {props.comments && props.comments.map((comment, index) => (
                (!comment.responseTo &&
                    <div>
                     <SingleComment comment={comment} movieId={props.movieId} refreshFunction={props.refreshFunction} />
                     <ReplyComment comments={props.comments} parentCommentId={comment._id} movieId={props.movieId} refreshFunction={props.refreshFunction}/>
                     </div>
                     )
            ))}
            
            {props.comments && props.comments.length === 0 &&
                <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', height:'200px'}} >
                    Be the first one who shares your thought about this movie
                </div>
            }

            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px', height: '50px' }}
                    onChange={handleChange}
                    value={commentValue}
                    placeholder="write some comments"
                />
                <br />
                <Button style={{ backgroundColor:"gray", borderRadius:"5px", width: '20%', height: '50px', marginLeft:"2px"}} onClick={onSubmit}>Submit</Button>
            </form>
        </div>
    )
}

export default Comment
