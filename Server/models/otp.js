import mongoose from "mongoose";

// Define the schema for OTP
const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true // Ensure each email has only one OTP entry
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600 // OTP documents will expire after 10 minutes (600 seconds)
    }
});

const OTP = mongoose.model('OTP', otpSchema);

export default OTP;