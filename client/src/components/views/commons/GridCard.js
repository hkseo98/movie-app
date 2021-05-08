import React, { useState } from 'react'
import { Col } from 'antd'
import GridCss from './Grid.css'

function GridCard(props) {

    const [isShown, setIsShown] = useState(false)

    if(props.landingPage) {
        return (
            <Col lg={6} md={8} sm={12} xs={24}>
                <div style={{ position: 'relative'}}>
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{ width:"100%", height:"320px", border:'2px solid black'}} src={props.image} alt={props.movieName} />
                    </a>
                </div>
            </Col>
        )
    } else {
        return (
            <Col lg={6} md={8} sm={12} xs={24}>
                <div onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false) } style={{ position: 'relative'}}>
                    {isShown ? <div style={{ width:"100%", height:"320px", border:'2px solid black' }}><h2 style={{ marginLeft:"7px" }}>{props.characterName}</h2></div>
                     : props.image ? 
                     <img style={{ width:"100%", height:"320px", border:'2px solid black'}} src={props.image} alt={props.characterName} /> 
                     : <div style={{ width:"100%", height:"320px", border:'2px solid black' }}><h2 style={{ marginLeft:"7px" }}>{props.characterName}</h2></div>}
                </div>
            </Col>
        )
    }
}

export default GridCard
