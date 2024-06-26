import Post from "../models/Post.js";
import User from "../models/auth.js";
import cloudinary from 'cloudinary';
import getDataUri from "../utility/dataUri.js";
import { extractPublicId } from "../utility/extractPublicId.js";

/* CREATE */
export const createPost = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const { description } = req.body;
        let picturePath = null;
        
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if file is included in the request
        if (req.file) {
            const file = req.file;
            const fileUri = getDataUri(file);
            const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
                cloud_name: process.env.CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
                resource_type: "auto",
                secure: true
            });
            picturePath = myCloud.secure_url; // Set picturePath to the uploaded image URL
        }
        

        const newPost = new Post({
            userId: _id,
            name: user.name,
            description : description,
            picturePath: picturePath,
            userPicturePath: user.picturePath,
            likes: {},
            comments: []
        });

        await newPost.save();
        res.status(201).json({success: true, message: "Post created successfully"});
    
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

/* READ */
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE */
export const likePost = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const { userId, value } = req.body;

        if (value !== 'LIKE' && value !== 'DISLIKE') {
            return res.status(400).json({ success: false, message: 'Invalid value' });
        }

        const post = await Post.findById(_id);
        const isLiked = post.likes.get(userId);

        if (isLiked && value === 'DISLIKE') {
            post.likes.delete(userId);
        } else if (!isLiked && value === 'DISLIKE') {
            post.likes.set(userId, false);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            _id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json({ success: true, data: updatedPost });
    } catch (err) {
        res.status(404).json({ success: false, message: err.message });
    }
};

/* UPDATE */
export const postComments = async (req, res) => {
    const { id: _id } = req.params;
    const { value } = req.body;
    if (value === undefined || value === null ){
        return res.status(500).json({ message: 'Server error' });
    }
    try {
        const updatedPost = await Post.findById(_id)
        updatedPost.comments.push(value);
        await updatedPost.save();

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ success: true, data: updatedPost.comments }); // Return the updated post with comments
    } catch (error) {
        console.error('Error posting comment:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/*DELETE A POST */
export const deletePost = async (req, res) => {
    try {
        const { postId: _id } = req.params;

        const todelete = await Post.findById(_id);
        if (!todelete) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        const url = todelete.picturePath;
        if(url && url.length  && url.length > 10) {
            //this means it's a saved in cloud storage
            const publicId = await extractPublicId(url);
            await cloudinary.v2.uploader.destroy(publicId ,{
                cloud_name: process.env.CLOUD_NAME, 
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET
            });
        }
        await Post.findOneAndDelete({ _id: todelete._id });

        res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Server error' });
    }

};

/*DELETE A COMMENT */
export const deleteComment = async (req, res) => {
};

/*ADD A FRIEND */
export const addFriend = async (req, res) => {
    const { userId: _id } = req.params;
    const { friendId } = req.body;

    try {
        // Find the user by _id and update the friends array
        const user1 = await User.findById(_id);
        const user2 = await User.findById(friendId);
        user1.friends.push(friendId);
        user2.friends.push(_id);
        await user1.save();
        await user2.save();
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error adding friend:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

/*REMOVE A FRIEND */
export const removeFriend = async (req, res) => {
    const { userId: _id } = req.params;
    const { friendId } = req.body;

    try {
        // Find the user by _id and update the friends array
        const user = await User.findByIdAndUpdate(_id ,
            { $pull: { friends: friendId } }, // $pull removes friendId from the array
            { new: true }
        );

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Error removing friend:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

