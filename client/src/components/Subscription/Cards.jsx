import React from 'react'
import './card.css'
import { Link } from 'react-router-dom'

const Cards = () => {
    return (
        <>
            <div className="container">
                <div className="wrapper">
                    <h1>Subscribe To our services</h1>
                    <p>Discout for limited time period only<br /></p>
                    <Link to='/checkout-Element' className="btn">BUY NOW</Link>

                </div>
            </div>
        </>
    )
}

export default Cards