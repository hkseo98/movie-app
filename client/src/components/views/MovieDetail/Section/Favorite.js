import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'antd' 

function Favorite(props) {

    const userFrom = props.userFrom
    const movieId = props.movieId
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)
    const [on, setOn] = useState(false)

    let variables = {
        userFrom,
        movieId,
        movieTitle,
        moviePost,
        movieRunTime
    }

    useEffect(() => {
        
        axios.post('http://localhost:5000/api/favorite/favoriteNumber', variables)
        .then(response => {
            if (response.data.success) {
                setFavoriteNumber(response.data.favoriteNumber)
            } else {
                alert('faied bringing number')
            }
        })

        axios.post('http://localhost:5000/api/favorite/favorited', variables)
        .then(response => {
            if (response.data.success) {
                setFavorited(response.data.favorited)
            } else {
                alert('faied bringing info')
            }
        })
    }, [])
 
    const onClickHandler = () => {
        if(Favorited) {
            axios.post('http://localhost:5000/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('failed removing favorite')
                    }
                })
        } else {
            axios.post('http://localhost:5000/api/favorite/addToFavorite', variables)
                .then(response => {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('failed adding favorite')
                    }
                })
        }
    }

    return (
        <div onMouseEnter={() => setOn(!on)} onMouseLeave={()=>setOn(!on)} style={{ display:"flex", justifyContent:"flex-end" }}>
            {!on ? <Button onClick={onClickHandler}>{Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}</Button> : 
            <Button onClick={onClickHandler}>{Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}</Button>}
        </div>
    )
}

export default Favorite
