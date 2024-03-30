import { randomInt } from 'crypto';
import OTP from '../models/otp.js';

export const getOtp = async (email) => {
    // Generate a random OTP
    const otp = randomInt(100000, 1000000);
    
    // Save the OTP and email in the database
    try {
        const newOTP = new OTP({
            email: email,
            otp: otp.toString() // Convert OTP to string for storage
        });
        await newOTP.save();
    } catch (error) {
        console.error('Error saving OTP:', error);
        throw new Error('Failed to save OTP.');
    }
    return otp;
};
