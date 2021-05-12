import React, {useState } from 'react'
import { useSelector } from 'react-redux'
import { Comment, Avatar, Button, Input } from 'antd'
import axios from 'axios'
import LikeDislikes from './LikeDislikes'
const { TextArea } = Input


function SingleComment(props) {
    
    const user = useSelector(state => state.user)
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")

    const onClickReply = () => {
        setOpenReply(!OpenReply)
    }

    const handleChange = (event) => {
        setCommentValue(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()

        let variables = {
            content: CommentValue,
            writer: user.userData._id,
            movieId: props.movieId,
            responseTo: props.comment._id
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
        setOpenReply(!OpenReply)
    }

    const actions = [
        <LikeDislikes commentId={props.comment._id} userId={user.userData._id}/>,
        <span style={{ marginLeft: "15px"}} onClick={onClickReply} key="comment-basic-reply-to"> Reply to </span>,
    ]

    return (
        <div>
            <Comment 
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt="image" />}
                content={ <p>{props.comment.content}</p> }></Comment>
                {OpenReply &&
                <form style={{ display: 'flex', width: "80%"}}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px', height: '50px' }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="write some comments"
                    />
                    <br />
                    <Button style={{ backgroundColor:"gray", borderRadius:"5px", width: '20%', height: '50px', marginLeft:"2px"}} onClick={onSubmit}>Submit</Button>
                </form>
                }
        </div>
    )
}

export default SingleComment
