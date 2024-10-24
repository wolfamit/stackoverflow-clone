import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import logo from '../../assets/icon.png'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Aboutauth from './Aboutauth'
import { signin, signup } from "../../actions/auth";
import { RxAvatar } from "react-icons/rx";
import { CiUnlock } from "react-icons/ci";
import Spinner from '../../components/Spinner/Spinner';
import './Auth.css';


const Auth = ({isDaytime}) => {
  const [signedIn, setsignedIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [backendMessage, setBackendMessage] = useState(false);
  const [name, setname] = useState('');
  const [email, setemail] = useState('test@test.com');
  const [password, setpassword] = useState('12345');
  const user = useSelector(state=>state.CurrentUserReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  
  useEffect(()=>{
    if(user){
    navigate("/");
  }},[])
  
  const handleSwitch = () => {
    setsignedIn(!signedIn);
    setname("");
    setemail("");
    setpassword("");
    setBackendMessage(false);
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
    <section className='auth-sec'
    style={isDaytime 
      ? { background: 'linear-gradient(30deg, rgb(160, 61, 61), rgb(107, 107, 210))' } 
      : { background: 'linear-gradient(30deg, rgb(160, 61, 61), white' }
    }
    >
      <ToastContainer />
      {!signedIn && <Aboutauth />}
      <div className={signedIn ? 'auth-container' : ' auth-container auth-container-mr'}>
        {!signedIn && <img src={logo} alt="stackover-logo" style={{ padding: '12px' }} />}
        {signedIn && <img src={logo} alt="" style={{ padding: '12px' }} />}
        <form onSubmit={handleSubmit} className='login-form' >
          <p className='auth-header'>USER LOGIN</p>
          {
            !signedIn && (
              <label htmlFor='name'>
                <h4></h4>
                <span className='auth-icon'><RxAvatar /></span>
                <input
                  type="name"
                  id='name'
                  placeholder='Username'
                  value={name}
                  onChange={(e) => setname(e.target.value)} />
              </label>
            )
          }
          {
            backendMessage && (<div style={{ padding: '10px 12px', border: "1px solid red", background: '#e9b4b2' }}><p style={{ color: '#6e211e' }}>Invalid login</p></div>)
          }
          <br />
          <label htmlFor="email"><h4></h4>
          <span className='auth-icon'><RxAvatar /></span>
            <input
              type="email"
              placeholder='john@gmail.com'
              autoComplete='email'
              value={email}
              onChange={(e) => setemail(e.target.value)}
            /></label>
          <br />
          <label htmlFor="password"><h4></h4>
          <span className='auth-icon'><CiUnlock /></span>
            
            <input type="password"
              autoComplete='current-password'
              placeholder='Qwertyui'
              value={password}
              onChange={(e) => setpassword(e.target.value)} />
              <br />
            {signedIn && <span style={{ color: 'blue', cursor: 'pointer' }}>forget password?</span>}
            {!signedIn && <p className="auth-subheading" style={{ margin: '2px 0', color: '#3B4045', fontSize: '15px' }}>Passwords must contain at least eight characters, <br /> including at least 1 letter and 1 number.</p>}
         <br />
          </label>



          {
            !signedIn && (
              <label htmlFor='checkbox' style={{ display: 'flex', justifyContent: 'start', margin: '4px 2px' }}>
                <input type="checkbox" name="check" id="check" style={{ width: '17px', margin: '4px 12px' }} /> <p className='auth-subheading' style={{ fontSize: '14px', color: '#3B4045' }}>
                  Opt-in to receive occasional product <br />updates, user research invitations,<br /> company announcements, and digests.
                </p>
              </label>

            )
          }
          <br />
          {signedIn ? (
            <div className='btn-wrapper'>
              {loading ? <Spinner /> : <button className='auth-btn'>Sign In</button>}
            </div>
          ) : (
            <div className='btn-wrapper'>
             {loading ? <Spinner /> : <button className='auth-btn'>Sign Up</button>}
            </div>
          )}


          {!signedIn && <p className='auth-subheading'> By clicking “Sign up”, you agree to our <span style={{ color: 'blue', cursor: 'pointer' }}>terms of <br /> service </span>and acknowledge you have read our <br /> <span style={{ color: 'blue', cursor: 'pointer' }}>privacy policy.</span> </p>}

        </form>

        {
          signedIn &&
          <p className='auth-subheading'>
            Don't have an accout? <button className='auth-btn-switch' onClick={handleSwitch}>Sign up</button>
          </p>
        }
        {
          !signedIn && <p className='auth-subheading'>Already have an account ? <button className='auth-btn-switch' onClick={handleSwitch}>Log In</button></p>
        }
      </div>
    </section>
    </>
  )
}

export default Auth