import React from 'react'
import Leftsidebar from '../../components/LeftsideBar/Leftsidebar'

import Homemain from '../../components/HomeMain/Homemain'
import Cards from '../../components/Subscription/Cards'
// import UsersCorousel from '../../components/UsersCorousel/UsersCorousel'

const Home = () => {
  return (
    <div>
      <Leftsidebar />
      <Cards />
      <Homemain />
    </div>
  )
}

export default Home