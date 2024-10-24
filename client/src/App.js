import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useState , useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar/Navbar';
import AllRoutes from './AllRoutes';
import { fetchAllQuestions } from './actions/question.js';
import { fetchAllUsers } from './actions/user.js';
import { getAllPost } from './actions/posts.js';
import Chatbot from './components/ChatBot/Chatbot.jsx';
import Leftsidebar from './components/LeftsideBar/Leftsidebar.jsx';
import Footer from './components/Footer/Footer.jsx';
import './App.css';
import { ThemeContext } from './contextAPI/ThemeContext.js';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.CurrentUserReducer);
  const { isDaytime } = useContext(ThemeContext);

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
        <Navbar />
        <Leftsidebar />
        <ToastContainer
          position="bottom-left"
          autoClose={1000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          theme="light" />
        <AllRoutes />
        <Footer />
      </Router>
      {user && <Chatbot user={user}/>}
    </div>
  );
}


export default App;
