import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css'; // Import CSS for styling
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dropdown = ({ isDropdownOpen, toggleDropdown, dropdownRef }) => {
  
  const user = useSelector(state=>state.CurrentUserReducer)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the dropdown if click occurs outside of it
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleDropdown(false);
      }
    };
    if (isDropdownOpen) {
        // Add event listener to document for click events only when the dropdown is open
        document.addEventListener('click', handleClickOutside);
      } else {
        // Remove event listener when the dropdown is closed
        document.removeEventListener('click', handleClickOutside);
      }
  
    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [toggleDropdown]); 

  return (
    <div ref={dropdownRef} className={`dropdown ${isDropdownOpen ? 'open' : ''}`} aria-orientation="vertical">
      <ul>
        <li ><Link className='nav-item' to={`/Users/${user?.data?.result._id}`}>Setting</Link></li>
        <li> <Link className='nav-item' to={'/Vip-pass'}>Buy Premium</Link></li>
      </ul>
      
    </div>
  );
};

export default Dropdown;
