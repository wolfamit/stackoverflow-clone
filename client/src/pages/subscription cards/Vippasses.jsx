import React from 'react'
import Leftsidebar from '../../components/LeftsideBar/Leftsidebar'
import CheckoutPage from '../../pages/CheckoutPage/CheckoutPage'
import './vippasses.css'

const Vippasses = () => {
  return (
    <div className='vip-container'>
        <Leftsidebar />
       <CheckoutPage />
        {/* <Homemain /> */}
        
    </div>
  )
}

export default Vippasses