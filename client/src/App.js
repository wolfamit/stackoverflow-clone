import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useState   } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar/Navbar';
import AllRoutes from './AllRoutes';
import { fetchAllQuestions } from './actions/question.js';
import { fetchAllUsers } from './actions/user.js';
import { getAllPost } from './actions/posts.js';
import Chatbot from './components/ChatBot/Chatbot.jsx';
import './App.css';

function App() {
  const [isDaytime, setIsDaytime] = useState(localStorage.getItem('theme') === '1');
  const dispatch = useDispatch()

  const user = useSelector(state=>state.CurrentUserReducer)
  
  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
    dispatch(getAllPost())
  }, [dispatch ]);
  
  useEffect(() => {
    localStorage.setItem('theme', isDaytime ? '1' : '0'); // Update theme in localStorage
  }, [isDaytime]);
  
  const themeChange = () => {
    setIsDaytime(prevIsDaytime => !prevIsDaytime);
    localStorage.setItem('theme', isDaytime ? '0' : '1');
  };

  return (
    <div className="App" data-theme={
      isDaytime ? "" : "dark"}
    >
      <Router>
        <Navbar isDaytime={isDaytime} themeChange={themeChange} />
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
     { user && <Chatbot user={user} isDaytime={isDaytime}/>}
    </div>

  );
}


export default App;
