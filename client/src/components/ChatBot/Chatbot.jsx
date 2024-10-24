import React, { useState, useEffect, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast  } from 'react-toastify';
import { SiChatbot, SiEightsleep } from 'react-icons/si';
import { SiOpenai } from "react-icons/si";
import { AiFillCloseSquare } from "react-icons/ai";

import { sendEmailOtp , verifyingEmailOtp } from '../../actions/user'
import './chatbot.css';
import { ThemeContext } from '../../contextAPI/ThemeContext';

const Chatbot = ({ user }) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hii there ✋🏼! ask me anything related to programming 🖥️.", sender: 'bot' }]); // State to store chat messages
  const [inputValue, setInputValue] = useState(''); // State to store user input
  
  const [showOtpModal, setShowOtpModal] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const {isDaytime} = useContext(ThemeContext)
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch()
  
  // Effect to scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const emailVerified = useSelector(state => state.emailVerifiedReducer)
  
  // Function to handle sending a message
  const sendMessage = async () => {
    if (!emailVerified) {
      toast.error(`First you need to verify your email`);
      setIsOpen(!isOpen)
      setShowOtpModal(true);
      return
    }

    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue, sender: 'user' }, {
        text: 'My key is exhausted! please try again after some time', sender: 'bot'
      }]);
      setInputValue('');
      try {
        const response = await fetch('https://api.openai.com/v1/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET_KEY}`
          },
          body: JSON.stringify({
            prompt: inputValue,
            max_tokens: 150,
            temperature: 0.7,
            stop: ['\n']
          })
        });

        if (response.ok) {
          const data = await response.json();
          setMessages([
            ...messages,
            { text: data.choices[0].text.trim(), sender: 'bot' }
          ]);
        } else {
          console.error('Failed to send message:', response.statusText);
        }
      } catch (error) {
        console.error('Error sending message:', error);
        
      }
    }
  };
  
  
  const handleSendOtp = async () => {
    if(!email){
      toast.error('Please enter you Email address');
      return;
    }
    setVerifyingEmail(true);
    try {
        const data = await dispatch(sendEmailOtp(user.data.result._id, email));
        if(data.success){
          toast.success("OTP sent successfully")
        }
    } catch (error) {
      toast.error('Error sending OTP');
    } finally {
      setVerifyingEmail(false);
    }
  };

  const handleVerifyOtp = async () => {
    if(!otp){
      alert('Please enter OTP'); 
    }
      setLoading(true)
      try {
        const data = await dispatch(verifyingEmailOtp(email , otp));
        if(data.success){
          toast.success("OTP verified")
          setShowOtpModal(false); // Close the OTP verification modal
          setIsOpen(true); // Show the chatbot modal
          setLoading(false); // set loading state to false
        }
      } catch (error) {
        toast.error('Error sending OTP:');
      } finally{
        setLoading(false)
    }
  }
  

  return (
    <div className="chatbot-container">
      {!isOpen ? (
        <div className="chatbot-icon" onClick={() => setIsOpen(!isOpen)}>
          <SiChatbot size={30} color={isDaytime ? '' : '#fff'} />
        </div>
      ) : (
        <div className="chatbot-open">
          <header className="chatbot-header">
            <h2 className="chatbot-title">Chatbot</h2>
            <button className="close-button" onClick={() => setIsOpen(!isOpen)}><AiFillCloseSquare size={22} /></button>
          </header>
          <ul className="chatbot-messages">
            {/* Chat messages will be displayed here
            <li className='chat incoming'>
              <span><SiOpenai /></span>
              <p>Hii there ✋🏼 <br /> how can I help you today?</p>
            </li>
            <li className='chat outgoing'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, totam?
              </p>
            </li> */}
            {messages.map((message, index) => (
              <li
                key={index}
                className={`chat ${message.sender === 'bot' ? 'incoming' : 'outgoing'
                  }`}
              >
                <span>
                  {message.sender === 'bot' ? <SiOpenai /> : null}
                </span>
                <p>{message.text}</p>
              </li>
            ))}
            <div ref={messagesEndRef}></div> {/* Empty div for scrolling */}
          </ul>
          <div className="chatbot-input">
            <textarea
              type="text"
              placeholder="Type your message..."
              required
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}

            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className='otp-modal'>
          <div id="recaptcha-container"></div>
          <div className='otp-modal-content'>
            <span className="close" onClick={() => setShowOtpModal(false)}>&times;</span>
            <div className='otp-form-container'>
              <h2>Email Verification</h2>
              <input
                className='otp-input'
                type="email"
                placeholder='john@gmail.com'
                autoComplete='email'
                value={email}
                disabled={verifyingEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className='otp-button'
                onClick={handleSendOtp}
                disabled={verifyingEmail}
              >{verifyingEmail ? 'Sending OTP...' : 'Sent OTP'}</button>
             <br />
              <input
                className='otp-input'
                type="number"
                placeholder="Enter OTP"
                value={otp}
                disabled={loading}
                onChange={(e) => setOtp(e.target.value)}
              />
              <br />
              <button
                className='otp-button'
                onClick={handleVerifyOtp}
                disabled={loading}
              >
                {loading ? 'verifying Otp' : 'Verify OTP'}
              </button>
              <br />
            </div>
          </div>
        </div>

      )}
    </div>
  );
};

export default Chatbot;
