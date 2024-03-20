import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Navbar from './components/Navbar/Navbar';
import AllRoutes from './AllRoutes';
import { fetchAllQuestions } from './actions/question.js';
import { fetchAllUsers } from './actions/user.js';
import { getAllPost } from './actions/posts.js';

import './App.css';



function App() {
  const dispatch = useDispatch()
  const [isDaytime, setIsDaytime] = useState(1);

  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    fetchWeather(latitude, longitude);
  })

  const fetchWeather = (latitude, longitude) => {
    const apikey = process.env.REACT_APP_WEATHER_API_KEY || '0a9b29b237c2443a9b133021241002'
    const baseUrl = `http://api.weatherapi.com/v1/current.json?key=${apikey}&lat=${latitude}&long=${longitude}&q=India`
    fetch(baseUrl)
      .then(response => response.json())
      .then(data => setIsDaytime(data.current.is_day))
  }

  const user = useSelector( state => state.CurrentUserReducer)
  const customerId = user?.data?.result.stripeCustomerId;

  console.log(customerId)
  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
    dispatch(getAllPost())
    
  }, [dispatch]);

  return (
    <div className="App" data-theme={
      isDaytime ? "" : "dark"}
    >
      <Router>
        <Navbar isDaytime={isDaytime} />
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          theme="light"
/>
        <AllRoutes />
      </Router>
    </div>

  );
}

export default App;
