import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_KEY, API_URL, IMAGE_BASE_URL, USER_SERVER } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Section/MovieInfo'
import GridCard from '../commons/GridCard'
import { Row, Button } from 'antd'
import Favorite from './Section/Favorite'
import { Input } from 'antd'
import Comment from './Section/Comment'


function MovieDetail(props) {
    let movieId = props.match.params.movieId; // url에서 :뒤 부분 가져오는 방법
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [isShown, setIsShown] = useState(false)
    const [Comments, setComments] = useState([])

    useEffect(() => {

        let endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        // console.log(props.match)
        let endPointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        axios.get(endPointInfo)
            .then(res => {
                setMovie(res.data)
            })

        axios.get(endPointCrew)
        .then(res => {
            setCasts(res.data.cast)
        })

        let variable = {
            movieId: movieId
        }

        axios.post('/api/comment/getComments', variable)
            .then(res => {
                if(res.data.success) {
                    setComments(res.data.comments)
                } else {
                    alert('failed bringing comments')
                }
            })

    }, [])

    const refreshFunction = (newComment) => {
        setComments(Comments.concat(newComment))
    }

    return (
        <div>
            {/* header */}
            <MainImage image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} 
            title={Movie.title} 
            desc={Movie.overview}/>

            {/* body */}

            <div style={{ width: "85%", margin: '1rem auto' }}>
                
                <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>

                {/* movie Info */}
                <MovieInfo movie={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>

                <br />
                {/* actors grid */}
                <div style={{ display:"flex", justifyContent:'center', margin:'2rem' }}>
                    <Button onClick={() => setIsShown(!isShown)}> Toggle Actor View </Button>
                </div>

                {isShown ? <Row gutter={[16, 16]}>
                    {Casts && Casts.map((cast, index) => (
                        <React.Fragment key={index}>
                            <GridCard
                                image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                characterName={cast.name}></GridCard>
                        </React.Fragment>
                    ))}
                </Row> : null}

                <Comment movieId={movieId} comments={Comments} refreshFunction={refreshFunction}/>

            </div>
            
        </div>
    )
}

export default MovieDetail
