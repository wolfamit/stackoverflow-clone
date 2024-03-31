import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import logo from '../../assets/icon.png'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Aboutauth from './Aboutauth'
import { signin, signup } from "../../actions/auth";
import Spinner from '../../components/Spinner/Spinner';
import Leftsidebar from '../../components/LeftsideBar/Leftsidebar';
import Navbar from '../../components/Navbar/Navbar';
import './Auth.css'

const Auth = ({isDaytime}) => {

  const [signedIn, setsignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backendMessage, setBackendMessage] = useState(false);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');



  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSwitch = () => {
    setsignedIn(!signedIn);
    setname("");
    setemail("");
    setpassword("");

  }

  // signin or signup form handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // for stopping the page to reload when submitted
    setLoading(true);
    if (!email || !password) {
      toast.error('Please enter your credentials');
      setLoading(false);
      return;
    }
    //include Email regix check 
    try {
      if (signedIn) {
        await dispatch(signin({ email, password }, navigate));
      } else {
        await dispatch(signup({ name, email, password }, navigate));
      }
      let profile = localStorage.getItem('Profile');
      if (!profile) {
        setBackendMessage(true);
      }
    } catch (error) {
      toast.error('Something went wrong! Please Try Again');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <Navbar isDaytime={isDaytime}/>
    < Leftsidebar />
    <section className='auth-sec'>

      <ToastContainer />
      {!signedIn && <Aboutauth />}
      <div className='auth-container'>
        {!signedIn && <img src={logo} alt="stackover-logo" style={{ padding: '12px' }} />}
        {signedIn && <img src={logo} alt="" style={{ padding: '12px' }} />}
        <form onSubmit={handleSubmit} className='login-form'>
          {
            !signedIn && (
              <label htmlFor='name'>
                <h4>User Name</h4>
                <input
                  type="name"
                  id='name'
                  value={name}
                  onChange={(e) => setname(e.target.value)} />
              </label>
            )
          }
          {
            backendMessage && (<div style={{ padding: '10px 12px', border: "1px solid red", background: '#e9b4b2' }}><p style={{ color: '#6e211e' }}>Invalid login</p></div>)
          }
          <br />
          <label htmlFor="email"><h4>Email</h4>
            <input
              type="email"
              placeholder='john@gmail.com'
              autoComplete='email'
              value={email}
              onChange={(e) => setemail(e.target.value)}
            /></label>
          <br />
          <label htmlFor="password"><h4>password</h4>
            <input type="password"
            autoComplete='current-password'
              placeholder='Qwertyui'
              value={password}
              onChange={(e) => setpassword(e.target.value)} />
            {signedIn && <span style={{ color: 'blue', cursor: 'pointer' }}>forget password?</span>}
            {!signedIn && <p style={{ margin: '2px 0', color: '#3B4045', fontSize: '15px' }}>Passwords must contain at least eight characters, <br /> including at least 1 letter and 1 number.</p>}
          </label>



          {
            !signedIn && (
              <label htmlFor='checkbox' style={{ display: 'flex', justifyContent: 'start', margin: '4px 2px' }}>
                <input type="checkbox" name="check" id="check" style={{ width: '17px', margin: '4px 12px' }} /> <p style={{ fontSize: '14px', color: '#3B4045' }}>
                  Opt-in to receive occasional product <br />updates, user research invitations,<br /> company announcements, and digests.
                </p>
              </label>

            )
          }

          {signedIn ? (
            <div className='btn-wrapper'>
              {loading ? <Spinner /> : <button className='auth-btn'>Sign In</button>}
            </div>
          ) : (
            <div className='btn-wrapper'>
             {loading ? <Spinner /> : <button className='auth-btn'>Sign Up</button>}
            </div>
          )}


          {!signedIn && <p> By clicking “Sign up”, you agree to our <span style={{ color: 'blue', cursor: 'pointer' }}>terms of <br /> service </span>and acknowledge you have read our <br /> <span style={{ color: 'blue', cursor: 'pointer' }}>privacy policy.</span> </p>}

        </form>

        {
          signedIn &&
          <p>
            Don't have an accout? <button className='auth-btn-switch' onClick={handleSwitch}>Sign up</button>
          </p>
        }
        {
          !signedIn && <p>Already have an account ? <button className='auth-btn-switch' onClick={handleSwitch}>Log In</button></p>
        }
      </div>
    </section>
    </>
  )
}

export default Auth