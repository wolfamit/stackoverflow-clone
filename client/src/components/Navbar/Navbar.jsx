import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdNightlight } from "react-icons/md";
import { IoGameController, IoSunny } from "react-icons/io5";
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";

import logo from '../../assets/logo.png';
import search from '../../assets/search-solid.svg'
import Avatar from '../../components/Avatar/Avatar';
import { setCurrentUser } from '../../actions/currentUser.js';
import Dropdown from './dropdown.jsx';
import Leftsideabar from '../LeftsideBar/Leftsidebar.jsx'
import { sethamToggle } from '../../actions/hamburgerToggle.js';
import "./Navbar.css";

const Navbar = ({ isDaytime, setIsDaytime }) => {
    const [toggle, setToggle] = useState(false); //state to manage toggle leftnavbar
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
    const [isHidden, setIsHidden] = useState(false);   // animation for top nav bar

    let previousScrollPosition = window.pageYOffset;
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPosition = window.pageYOffset;

            if (previousScrollPosition < currentScrollPosition && currentScrollPosition > 100) {
                setIsHidden(true); // Hide navbar
            } else {
                setIsHidden(false); // Show navbar
            }

            previousScrollPosition = currentScrollPosition;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll); // Cleanup event listener on component unmount
        };
    }, []);

    const dropdownRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => (state.CurrentUserReducer))
    // i don't know why user contains default picture of avatar
    const Users = useSelector(state => state.usersReducer);
    const currentProfile = Users.find(userItem => userItem._id === user?.data?.result?._id);
    // so current profile picturePath contained in currentProfile
    const throwToast = () => {
        toast.success('Logged out successfully');
    }
    const handleLogOut = async () => {
        dispatch({ type: "LOGOUT" });
        dispatch(setCurrentUser(null));
        dispatch(sethamToggle(false));
        navigate('/Auth');
        throwToast();
    };

    useEffect(() => {
        setToggle(false);
        //dispatch(sethamToggle(toggle));
        const token = user?.data?.token;
        if (token) {
            const decodedToken = jwtDecode(token).exp * 1000;
            const currentTime = new Date().getTime();
            // console.log('Token expiration:', new Date(decodedToken));
            // console.log('Current time:', new Date(currentTime));
            if (decodedToken <= currentTime) {
                handleLogOut();
            }
        }
        // Dispatch setCurrentUser action
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    }, [dispatch]);
    // Event handler to toggle dropdown of avatar visibility
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDaytime);
        localStorage.setItem("isDarkMode", isDaytime);
    };

    const handleToggle = () => {
        setToggle(!toggle);
        console.log(toggle)
        dispatch(sethamToggle(toggle));
    };

    const handleThemeChange = () => {
        setIsDaytime(!isDaytime);
        localStorage.setItem('isDarkMode', isDaytime);
    }

    return (
        <>
            <Leftsideabar />
            <nav className={!isHidden ? "top-nav" : ' top-nav blur'} >
                <div className='navbar' >
                    <div className="hamburger" onClick={() => handleToggle()}>
                        <GiHamburgerMenu size={30} color={isDaytime ? '' : 'white'} />
                    </div>
                    <div className='logo'>
                        <Link to={!user ? '/Auth' : '/'}>
                            {
                                <img src={logo} alt="logo" style={isDaytime ? {} : { filter: 'invert(.5) brightness(2)' }} />
                            }
                        </Link>
                    </div>
                    <Link to='/' className='nav-item hd'>HOME</Link>
                    <Link to='/public' className='nav-item hd'>PUBLIC COMMUNITY</Link>
                    <Link to='/contact' className='nav-item hd'>CONTACT US</Link>
                    <form className='search'>
                        <input type="text" name="search" placeholder="search.." id="search1" />
                        <img src={search} alt="search" width={18} style={isDaytime ? {} : { filter: 'invert(.5) brightness(1)' }} />
                    </form>
                    {
                        !user ? <Link to='/Auth' className='nav-item'>Log in</Link> :
                            <div onClick={toggleDropdown} ref={dropdownRef}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            >
                                <Avatar imageSrc={currentProfile && currentProfile?.picturePath.length <= 30 ? `${process.env.REACT_APP_BASE_URL}assets/${currentProfile?.picturePath}` : currentProfile?.picturePath} margin="10px" backgroundColor="blue" py="21px" px='21px' cursor="cursor" borderRadius="50%" ><Link to='/User/'></Link></Avatar>
                                <Dropdown isDropdownOpen={isDropdownOpen} toggleDropdown={toggleDropdown} dropdownRef={dropdownRef} user={user} />
                            </div>
                    }
                    <div onClick={handleThemeChange} style={{
                        width: '30px',
                        margin: '3px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease-in-out' // Transition for the container
                    }}>
                        <div style={{ transition: 'all 0.3s ease-in-out' }}>
                            {!isDaytime ? <MdNightlight color={'white'} size={20} /> : <IoSunny color={'black'} size={24} />}
                        </div>
                    </div>

                    {user ?
                        <div style={{ maxWidth: "120px" }} className='d-flex'>
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