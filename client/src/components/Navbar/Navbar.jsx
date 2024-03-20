import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaBell } from "react-icons/fa";
import { toast } from 'react-toastify';

import { jwtDecode } from "jwt-decode";
import logo from '../../assets/logo.png';
import darklogo from '../../assets/Stack_Overflow_Logo.png';
import search from '../../assets/search-solid.svg'
import Avatar from '../../components/Avatar/Avatar';
import { setCurrentUser } from '../../actions/currentUser.js';
import Dropdown from './dropdown.jsx';
import { sethamToggle } from '../../actions/hamburgerToggle.js';
import "./Navbar.css";

const Navbar = ({ isDaytime }) => {
    const [toggle, setToggle] = useState(false); //state to manage toggle leftnavbar

    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
    const dropdownRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => (state.CurrentUserReducer)) // i don't know why user contains default picture of avatar
    // console.log(user?.data?.result?._id);
    const Users = useSelector(state => state.usersReducer);
    // console.log(Users)
    const currentProfile = Users.find(userItem => userItem._id === user?.data?.result?._id);
    // console.log(currentProfile)

    const handleLogOut = () => {
        dispatch({ type: "LOGOUT" });
        dispatch(setCurrentUser(null));
        navigate('/');
        toast.success('Logged out successfully');
    };



    useEffect(() => {
        const token = user?.data?.token;  // Retrieve the token from the user data, if available
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {// If the token has expired, log the user out              
                handleLogOut();
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [dispatch]);

    // Event handler to toggle dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleToggle = () => {
        setToggle(!toggle);
        dispatch(sethamToggle(toggle))
    };

    return (
        <>
            <nav className="top-nav" >
                <div className='navbar' >
                    <div className="hamburger" onClick={handleToggle}>
                        <GiHamburgerMenu size={30} color={isDaytime ? '' : 'white'} />
                    </div>
                    <div className='logo'>
                        <Link to={!user ? '/Auth' : '/'}>
                            {
                                isDaytime ? <img src={logo} alt="logo" /> : <img src='https://tse1.mm.bing.net/th?id=OIP.dEbRT25tGHC5_qYdFxDOIgHaCs&pid=Api&P=0&h=180' alt="logo" className='dark-logo' />
                            }
                        </Link>
                    </div>
                    <Link to='/' className='nav-item hd'>Home</Link>
                    <Link to='/about' className='nav-item hd'>Terms $ condition</Link>
                    <Link to='/contact' className='nav-item hd'>Contact</Link>
                    <form className='search'>
                        <input type="text" name="search" placeholder="search.." id="search" />
                        <img src={search} alt="search" width={18} />
                    </form>
                    {
                        !user ? <Link to='/Auth' className='nav-item'>Log in</Link> :
                            <div onClick={toggleDropdown} ref={dropdownRef}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            >
                                <Avatar imageSrc={`http://localhost:5500/assets/${currentProfile?.picturePath}`} margin="10px" backgroundColor="blue" py="21px" px='21px' cursor="cursor" borderRadius="50%" ><Link to='/User/'></Link></Avatar>
                                <Dropdown isDropdownOpen={isDropdownOpen} toggleDropdown={toggleDropdown} dropdownRef={dropdownRef} />
                            </div>
                    }

                    {user ?
                        <div style={{ maxWidth: "120px" }} className='d-flex'><FaBell color={!isDaytime ? 'white' : ''} size={20} />
                            <button onClick={handleLogOut}>Log out</button>
                        </div>
                        :
                        ""}
                </div>
            </nav >
        </>
    )
}

export default Navbar