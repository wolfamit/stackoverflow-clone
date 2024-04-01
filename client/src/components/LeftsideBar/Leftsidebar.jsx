import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import globe from "../../assets/Globe.svg"
import './Leftsidebar.css'

const Leftsidebar = () => {
    const toggle = useSelector(state => state.toggleReducer)

    return (
        <nav className={`left-sidebar ${toggle? "" : "close"}`}>
            <section className='side-nav'>
                <NavLink to='/' className='sidenav-links'><p>Home</p></NavLink>
                <NavLink to='/public' className='sidenav-links'><p>PUBLIC</p></NavLink>
                <NavLink to='/questions' className='sidenav-links'><p><img src={globe} alt="globe" />Question</p></NavLink>
                <NavLink to='/Tags' className='sidenav-links'><p>Tags</p></NavLink>
                <NavLink to='/Users' className='sidenav-links'><p>Users</p></NavLink>
                <NavLink to='/Ask-questions' className='sidenav-links'><p>Ask Your Question</p></NavLink>
            </section>
        </nav>
    )
}


export default Leftsidebar