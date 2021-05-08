import React from 'react'
import { Descriptions, Badge } from 'antd';


function MovieInfo(props) {

    let movie = props.movie

    return (
        <Descriptions title="movie Info" bordered>
            <Descriptions.Item label="Title">{movie.title}</Descriptions.Item>
            <Descriptions.Item label="Release Date">{movie.release_date}</Descriptions.Item>
            <Descriptions.Item label="Revenue">{movie.revenue}</Descriptions.Item>
            <Descriptions.Item label="Vote Count">{movie.vote_count}</Descriptions.Item>
            <Descriptions.Item label="Status">{movie.status}</Descriptions.Item>
            <Descriptions.Item label="Popularity">{movie.popularity}</Descriptions.Item>
        </Descriptions>
    )
}

export default MovieInfo
