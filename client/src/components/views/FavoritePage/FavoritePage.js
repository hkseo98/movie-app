import React, { useEffect, useState }from 'react'
import './favorite.css'
import axios from 'axios'
import { Popover } from 'antd'
import { IMAGE_BASE_URL } from '../../Config'


function FavoritePage() {

    const userFrom = { userFrom: localStorage.getItem('userId') }
    
    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        axios.post('http://localhost:5000/api/favorite/getFavoredMovie', userFrom)
            .then(response => {
                if (response.data.success) {
                    setFavorites(response.data.favorites)
                } else {
                    alert('failed bringing favored movies')
                }
            })
    }, [Favorites])

    const onClickHandler = (movieId, userFrom) => {
        const variable = {
            movieId,
            userFrom
        }
        axios.post('http://localhost:5000/api/favorite/removeFromFavorite', variable)
            .then(response => {
                if(response.data.success) {
                    Favorites.forEach((movie, i) => {
                        Favorites.splice(i, 1)
                    })
                } else {
                    alert("failed removing")
                }
            })
    }

    const renderCards = Favorites.map((movie, index)=> {

        const content = (
            <div>
                {movie.moviePost ? 
                <img src={`${IMAGE_BASE_URL}w400${movie.moviePost}`} /> 
                : "no image"}
            </div>
        )

        return <tr key={index}>
            <Popover content={content} title={movie.movieTitle}>
                <td>{movie.movieTitle}</td>
            </Popover>
            <td>{movie.movieRunTime} mins</td>
            <td><a href={`/movie/${movie.movieId}`}>Go To Movie</a></td>
            <td><button onClick={() => onClickHandler(movie.movieId, movie.userFrom)}>Remove</button></td>
        </tr>
    })

    return (
        <div style={{ width:"85%", marginLeft: "3rem", marginRight: "3rem", marginBottom: "3rem", paddingTop:"130px"}}>
            <h2> My Favorites </h2>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <th>Go to Movie</th>
                        <td>Remove from Favorite</td>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
                
            </table>
        </div>
    )
}

export default FavoritePage
