import React from 'react'
import './vippasses.css'
import Cards from '../../components/Subscription/Cards'
import Homemain from '../Home/Home'
import Leftsidebar from '../../components/LeftsideBar/Leftsidebar'
const Vippasses = () => {
  return (
    <div className='vip-container'>
        <Leftsidebar />
        <Cards />
        {/* <Homemain /> */}
        
    </div>
  )
}

export default Vippasses