import React from 'react'
import success from '../../assets/success.png'
import { Navigate } from 'react-router-dom'
const Success = () => {
  return (
    <div>
        <h1>success</h1>
        <h1>success</h1>
        <img src={success} alt="success"  />
        <button onClick={()=> Navigate('/')}>
            navigate to home page
        </button>
    </div>
  )
}

export default Success