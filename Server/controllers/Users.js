import mongoose from "mongoose";
import User from '../models/auth.js';

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
    const { name, about, tags, occupation, country , picturePath} = req.body;
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
            // Get existing tags from the database
            const user = await User.findById(_id);
            const existingTags = user.tags || [];

            // Merge existing tags with new tags
            const mergedTags = Array.from(new Set([...existingTags, ...tags])); // Using Set to remove duplicates

            updateFields.tags = mergedTags;
        }
        if (occupation) {
            updateFields.occupation = occupation;
        }
        if (country) {
            updateFields.location = country;
        }
        if(picturePath){
            updateFields.picturePath = picturePath;
        }
        const updatedProfile =  await User.findByIdAndUpdate(_id, { $set: updateFields }, { new: true });
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(405).json({ message: "Error in updateProfile", error: error.message });
    }
};

