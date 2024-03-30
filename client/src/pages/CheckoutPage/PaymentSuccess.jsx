import React from 'react'
import success from '../../assets/success.png'
import { useNavigate } from 'react-router-dom'

const PaymentSuccess = () => {
  const navigate = useNavigate()
  const handlenavigate =()=>{
    navigate('/')
  }

  return (
    <div
    style={{
      textAlign: 'center',
      marginTop: "70px"
    }}
    >
    <h1>Payment Successfuly</h1><span><img src={success} alt="success" /></span>
      <button onClick={handlenavigate}>Go to Homo</button>
    </div>
  )
}

export default PaymentSuccess