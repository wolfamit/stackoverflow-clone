import React from 'react'
import { Link } from 'react-router-dom'
import TypingComponent from '../React Typed/ReactTyped'
import './card.css'

const Cards = () => {
    return (
        <>
            <div  className="container">
                <div className="wrapper">
                    <h1>Subscribe To our services</h1>
                    <p>Discout for limited time period only<br /></p>
                    <Link to='/checkout-Element' className="btn">BUY NOW</Link>
                </div>
            <TypingComponent/>
            </div>
        </>
    )
}

export default Cards