import React, { useEffect, useState } from 'react'
import { Tooltip } from 'antd'
import axios from 'axios'
import { useSelector } from 'react-redux'
import {DislikeOutlined, LikeFilled, LikeOutlined, DislikeFilled } from '@ant-design/icons';

function LikeDislikes(props) {
    const user = useSelector(state => state.user)
    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [DislikeAction, setDislikeAction] = useState(null)
    const [LikeAction, setLikeAction] = useState(null)

    let variables = {
        commentId: props.commentId,
        userId: props.userId
    }

    useEffect(() => {
        axios.post('/api/like/getLikes', variables)
            .then(res => {
                if(res.data.success) {
                    // 좋아요 수
                    setLikes(res.data.likes.length)
                    // 내가 좋아요를 눌렀는지
                    res.data.likes.map(like => {
                        if(like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })
                } else {
                    alert('failed bringing Likes')
                }
            })

        axios.post('/api/like/getDislikes', variables)
        .then(res => {
            if(res.data.success) {
                // 싫어요 수
                setDislikes(res.data.dislikes.length)
                // 내가 싫어요를 눌렀는지
                res.data.dislikes.map(dislike => {
                    if(dislike.userId === props.userId) {
                        setDislikeAction('disliked')
                    }
                })
            } else {
                alert('failed bringing dislikes')
            }
        })
    }, [])

    const onLike = () => {
        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }

        if(LikeAction === null) {
            axios.post('/api/like/upLike', variables)
                .then(res => {
                    if(res.data.success) {
                        setLikes(Likes + 1)
                        setLikeAction('liked')
                        if(DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }
                    } else {
                        alert('failed uplikeing')
                    }
                })
        } else {
            axios.post('/api/like/unLike', variables)
                .then(res => {
                    if(res.data.success) {
                        setLikes(Likes - 1)
                        setLikeAction(null)
                    } else {
                        alert('failed unlikeing')
                    }
                })
        }
    }

    const onDislike = () => {
        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }
        if(DislikeAction !== null) {
            axios.post('/api/like/unDislike', variables) 
                .then(res => {
                    if(res.data.success) {
                        setDislikes(Dislikes-1)
                        setDislikeAction(null)
                    } else {
                        alert('failed undislikeing')
                    }
                })
        } else {
            axios.post('/api/like/upDislike', variables)
                .then(res => {
                    if(res.data.success) {
                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')
                        if(LikeAction !== null) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }
                    } else {
                        alert('failed updislikeing')
                    }
                })
        }
    }

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like!" color="blue">
                    {LikeAction ?  <LikeFilled onClick={onLike}/> : <LikeOutlined onClick={onLike}/>}
                </Tooltip>
            <span style={{ padding: '8px', cursor:'auto' }}>{Likes}</span>
            </span>
            <span key="comment-basic-dislike">
                <Tooltip color="blue" title="Dislike!">
                    {DislikeAction ?  <DislikeFilled onClick={onDislike} /> : <DislikeOutlined onClick={onDislike}/>}
                </Tooltip>
    <span style={{ paddingLeft: '8px', cursor:'auto' }}>{Dislikes}</span>
            </span>
        </div>
    )
}

export default LikeDislikes
