import React, { useState, useEffect,useRef  } from 'react';
import { auth } from '../../firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { toast } from 'react-toastify';
import { SiChatbot } from 'react-icons/si';
import { SiOpenai } from "react-icons/si";
import Avatar from '../Avatar/Avatar'
import { AiFillCloseSquare } from "react-icons/ai";
import { OtpVerification } from '../Otp Verification/OtpVerification';
import Spinner from '../Spinner/Spinner'
import './chatbot.css';

const Chatbot = ({ isDaytime }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hii there ✋🏼! ask me anything related to programming 🖥️.", sender: 'bot' }]); // State to store chat messages
  const [inputValue, setInputValue] = useState(''); // State to store user input

  const [showOtpModal, setShowOtpModal] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false); // State to track OTP sending process
  const [resendTimer, setResendTimer] = useState(0); // State to track resend timer
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);


  const messagesEndRef = useRef(null);

  // Effect to start resend timer
  useEffect(() => {
    let intervalId;
    if (resendTimer > 0) {
      intervalId = setInterval(() => {
        setResendTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }
    scrollToBottom();
    return () => clearInterval(intervalId);
  }, [resendTimer , messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to handle sending a message
  const sendMessage = async () => {
    if (!phoneNumber) {
      toast.error(`First you need to enter your phone number`)
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
            Authorization: `Bearer ${REACT_APP_OPENAI_SECRET_KEY}`
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

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth,
        "recaptcha-container");}
    }

  const handleSendOtp = async () => {
    setSendingOtp(true);
    await onCaptchVerify();
    // Start timer for resend OTP (e.g., 60 seconds)
    setResendTimer(60);
    try {
      const verifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
      window.confirmationResult = confirmationResult;
      console.log(window.confirmationResult)
      console.log(confirmationResult)

      setVerificationId(confirmationResult.verificationId);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      await signInWithCredential(auth, credential);
      // OTP verification succeeded
      setLoading(false);
      toast.success('OTP Verified');
      setShowOtpModal(false); // Close the OTP verification modal
      setIsOpen(true); // Optionally, open the chatbot interface or perform any other actions
      setIsOpen(true);
    } catch (error) {
      console.error('Error verifying OTP:', error);
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
              <h2>Phone Number Verification</h2>


              <input
                className='otp-input'
                type="tel"
                required
                placeholder="+9182********"
                value={phoneNumber}
                disabled={sendingOtp}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button className='otp-button'
                onClick={handleSendOtp}
                disabled={sendingOtp} // Disable input field during OTP sendind
              >{sendingOtp ? 'Sending OTP...' : 'Sent OTP'}</button>
              <p style={{ margin: '3px 0' }}>
                Resend OTP in {resendTimer} seconds
              </p>
              <input
                className='otp-input'
                type="text"
                placeholder="Enter OTP"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <button
                onClick={handleVerifyOtp}
                disabled={loading}
              >
                {loading ? <Spinner size={5} /> : 'Verify OTP'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
