import React, {  useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Dropdown = ({ isDropdownOpen, toggleDropdown, dropdownRef , user }) => {
  
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
        <li className='plan'>PLAN: {user?.data?.result?.subscription.length === 0 ? " Basic" : user?.data?.result?.subscription.plan} </li>
        <li ><Link className='nav-item' to={`/Users/${user?.data?.result._id}`}>Setting</Link></li>
        <li> <Link className='nav-item' to={'/Vip-pass'}>Buy Premium</Link></li>
      </ul>
      
    </div>
  );
};

export default Dropdown;
