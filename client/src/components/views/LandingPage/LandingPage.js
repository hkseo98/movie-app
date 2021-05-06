import React, { useEffect, useState } from 'react'
import { AiFillApple } from "react-icons/ai";
// for more icons => https://react-icons.github.io/react-icons/icons?name=ai
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import axios from 'axios'
import MainImage from './Sections/MainImage'
import GridCards from '../commons/GridCard'
import { Row } from 'antd' 


function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`

        fetchMovies(endPoint)
    }, [])

    const fetchMovies = (endPoint) => {
        axios.get(endPoint)
            .then(response => {
                setMovies([...Movies, ...response.data.results])
                setMainMovieImage(response.data.results[0])
                console.log(response.data)
                setCurrentPage(response.data.page)
             })
    }

    const loadMoreItems = () => {
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`
        fetchMovies(endPoint)
    }

    return (
        <div style={{ width: '100%', margin: '0'}}>
            
            {MainMovieImage != null && <MainImage image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`} title={MainMovieImage.title} desc={MainMovieImage.overview}/>}

            <div style={{ width:"85%", margin:"0rem auto", paddingTop:"6rem"}}>
                <h2>Movies by latest</h2>
                <hr />

                <Row gutter={[10, 10]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                            movieId={movie.id}
                            movieName={movie.original_title}></GridCards>
                        </React.Fragment>
                    ))}
                </Row>

            </div>
            <div style={{ display:'flex', justifyContent:'center'}}>
                <button style={{ marginTop: '1rem'}} onClick={loadMoreItems}>Load More</button>
            </div>
        </div>
    )
}

export default LandingPage
