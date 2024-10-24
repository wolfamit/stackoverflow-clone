import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import globe from "../../assets/Globe.svg"
import './Leftsidebar.css'

const Leftsidebar = () => {
    const toggle = useSelector(state => state.toggleReducer) || false;

    return (
        <nav className={`left-sidebar ${toggle? "" : "close"}`}>
            <section className='side-nav'>
                <NavLink to='/' className='sidenav-links'><p>HOME</p></NavLink>
                <NavLink to='/public' className='sidenav-links'><p>PUBLIC COMMUNITY</p></NavLink>
                <NavLink to='/questions' className='sidenav-links'><p><img src={globe} alt="globe" />QUESTIONS</p></NavLink>
                <NavLink to='/Tags' className='sidenav-links'><p>TAGS</p></NavLink>
                <NavLink to='/Users' className='sidenav-links'><p>USERS</p></NavLink>
                <NavLink to='/Ask-questions' className='sidenav-links'><p>ASK YOUR QUESTION</p></NavLink>
            </section>
        </nav>
    )
}


export default Leftsidebar;