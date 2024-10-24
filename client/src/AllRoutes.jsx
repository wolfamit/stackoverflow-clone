import React from 'react'
import { useSelector } from 'react-redux';

import {Routes , Route} from 'react-router-dom';
import Auth from './pages/Auth/Auth'
import Home from './pages/Home/Home';
import Askquestion from './pages/AskQuestion/Askquestion';
import Displayquestions from './pages/Questions/Displayquestions';
import Users from './pages/User/Users'  
import Tags from './pages/Tags/Tags';
import UserProfile from './pages/UserProfile/UserProfile';
import Publichome from './pages/Public space/Publichome';
import Vippasses from './pages/subscription cards/Vippasses';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import PaymentSuccess from './pages/CheckoutPage/PaymentSuccess';
import Homemain from './components/HomeMain/Homemain';
import ErrorNotfound from './components/ErrorNotfound/ErrorNotfound.js';

const AllRoutes = () => {
  return (
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/Auth' element={<Auth/>}/>
        <Route exact path='/public' element={<Publichome />}/>
        <Route exact path='/questions' element={<Homemain/>}/>
        <Route exact path='/Ask-questions' element={<Askquestion/>}/>
        <Route exact path='/Questions/:id' element={<Displayquestions />}/>
        <Route exact path='/tags' element={<Tags/>}/>
        <Route exact path='/Users' element={<Users/>}/>
        <Route exact path='/Users/:id' element={<UserProfile /> }/>
        <Route exact path='/Vip-pass' element={<Vippasses /> }/>
        <Route exact path='/checkout-Element' element={<CheckoutPage /> }/>
        <Route exact path='/api/payment-success' element={<PaymentSuccess /> }/>
        <Route exact path='*' element={<ErrorNotfound />} />
    </Routes>

  )
}

export default AllRoutes