import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import './Footer.css'
const Footer = ({isDaytime}) => {
    const navigate = useNavigate();
    return (
        <div className='footer-container'>
            <div className='footer'>
                <div className='logo'>
                    <img src={logo}  style={isDaytime ? {} : { filter: 'invert(.5) brightness(2)' }} alt="footer-logo" />
                </div>

                <div className='footer-section'>
                    <h3>QUESTIONS</h3>
                    <div>Questions</div>
                    <div>Help</div>
                    <div>Chat</div>

                </div>

                <div className='footer-section'>
                    <h3>PRODUCTS</h3>
                    <div>Teams</div>
                    <div>Advertisement</div>
                    <div>Talent</div>
                </div>

                <div className='footer-section'>
                    <h3>COMPANY</h3>
                    <div>About</div>
                    <div>Press</div>
                    <div>Work Here</div>
                    <div>Legal</div>
                    <div>Privacy Police</div>
                    <div>Terms & Services</div>
                    <div>Contact Us</div>
                    <div>Cookie Settings</div>
                    <div>Cookie Policy</div>
                </div>
            </div>
            <div className='footer-copyright'>Copyright @2024</div>
        </div>
    )
}

export default Footer