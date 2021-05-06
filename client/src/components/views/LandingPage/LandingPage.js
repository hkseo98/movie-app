import React from 'react'
import { AiFillApple } from "react-icons/ai";
// for more icons => https://react-icons.github.io/react-icons/icons?name=ai

function LandingPage() {
    return (
        <>
            <div className="app">
                <AiFillApple style={{ fontSize: '4rem' }} /><br />
                <span style={{ fontSize: '2rem' }}>Let's Watching Movies!</span>
            </div>
        </>
    )
}

export default LandingPage
