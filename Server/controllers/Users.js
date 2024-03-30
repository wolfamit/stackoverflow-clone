import mongoose from "mongoose";
import User from '../models/auth.js';
import cloudinary from 'cloudinary';
import getDataUri from "../utility/dataUri.js";
import { getOtp } from "../utility/getOtp.js";
import nodemailer from 'nodemailer';
import OTP from "../models/otp.js";
// import mg from 'nodemailer-mailgun-transport'
/*GET*/
export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find().lean(); // Execute the query and convert documents to plain JavaScript objects
        const allUsersDetails = allUsers.map(user => ({ // Map each user document to the desired format
            _id: user._id,
            name: user.name,
            picturePath: user.picturePath,
            occupation: user.occupation,
            joinedOn: user.joinedOn,
            // phoneNumber: user.phoneNumber,
            about: user.about,
            friends: user.friends,
            location: user.location,
            viewedProfile: user.viewedProfile,
            impressions: user.impressions,
            tags: user.tags,
            subscription: user.subscription,
        }));
        res.status(200).json(allUsersDetails); // Send the details of all users as a JSON response
    } catch (error) {
        console.error("Error in getAllUsersDetails:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

/*PATCH*/
export const updateProfile = async (req, res) => {
    const { id: _id } = req.params;
    const { name, about, tags, occupation, country } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("User Unregistered");
    }
    try {
        const updateFields = {};
        // Add fields to the update object if they are provided
        if (name) {
            updateFields.name = name;
        }
        if (about) {
            updateFields.about = about;
        }
        if (tags && tags.length > 0) {
            console.log(tags);
            const user = await User.findById(_id);
            const existingTags = user.tags || [];
            const newTags = tags.split(" ");
            const mergedTags = Array.from(new Set([...existingTags, ...newTags]));

            // Filter out any empty strings or null values from the tags array
            const filteredTags = mergedTags.filter(tag => tag);
            updateFields.tags = filteredTags;
        }
        if (occupation) {
            updateFields.occupation = occupation;
        }
        if (country) {
            updateFields.location = country;
        }
        const file = req.file;
        if (file) {
            const fileUri = getDataUri(file);
            const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
                cloud_name: process.env.CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
                resource_type: "auto",
                secure: true
            })
            updateFields.picturePath = myCloud.secure_url;
        }
        const updatedProfile = await User.findByIdAndUpdate(_id, { $set: updateFields }, { new: true });
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(405).json({ message: "Error in updateProfile", error: error.message });
    }
};

/*post*/

// const transporter = nodemailer.createTransport({
//     service: 'Gmail', // Or any other email service
//     auth: {
//         user: 'stackoverflowclone284@gmail.com',
//         pass: '4[PShD)c'
//     }
// });

export const sendOTPByEmail = async (req, res) => {
    const { id: _id } = req.params;
    const { email } = req.body;
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    const otp = await getOtp(email);
    
    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL, // Your Gmail username
                pass: process.env.GMAIL_PASS // Your Gmail password
            }
        });
        // Send mail with defined transport object
        const mailOptions = {
            from: '"stackoverflow" <stackoverflowclone284@gmail.com>',
            to: email,
            subject: 'OTP for Chatbot Verification',
            text: `Your OTP for verification is: ${otp}`
        };
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(404).json({success: false,  message: "Cannot send email" });
            }
            return res.status(200).json({ success: true });
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(400).json({ success: false , message: "Cannot send email" });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const chatter = await OTP.findOne({ email: email });

        if (!chatter) {
            return res.status(404).json({ message: "User not found" });
        }

        // Convert user-provided OTP to string for comparison
        const userOTP = otp.toString();
        if (chatter.otp === userOTP) {
            return res.status(202).json({ success: true });
        }else{
            return res.status(401).json({ success: false });
        }
} catch (error) {
        console.error('Error Verifying email:', error);
        return res.status(500).json({ success: false , message: "Failed to verify OTP via email." });
    }
}
