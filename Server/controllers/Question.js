import Questions from "../models/questions.js";
import User from "../models/auth.js";
import mongoose from "mongoose";

// POST
export const askQuestion = async (req, res) => {
    try {
        const { questionTitle, questionBody, userPosted, questionTags , userId  } = req.body;
        const postQuestionData = {
            UserId: userId,
            questionTags: questionTags,
            questionTitle: questionTitle,
            questionBody: questionBody,
            userPosted:userPosted
        };

        const postquestion = new Questions(postQuestionData);
        // Update tags array in the user document
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User Not found" });
        }
        user.tags = [...user.tags, ...questionTags]; // Merge existing tags with new tags
        user.lastPostDate = new Date();
        user.postCount++; // Increment postCount
        await user.save();
        await postquestion.save();
        return res.status(201).json({ message: "Question posted successfully" });
    } catch (error) {
        console.log("error in AskQuestion:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};
// GET
export const getAllQuestion = async (req, res) => {
    try {
        const questionList = await Questions.find();
        res.status(200).json(questionList);
    } catch (error) {
        console.log("error in getAllQuestion:", error.message);
        res.status(404).json({ message: error.message });
    }
};
// DELETE
export const deleteQuestion = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable...");
    }
    try {
        await Questions.findByIdAndDelete(_id);
        res.status(200).json("Question deleted successfully")
    } catch (error) {
        console.log("error in delete question:", error.message);
        res.status(404).json({ message: error.message });
    }
};

// PATCH
export const voteQuestion = async (req, res) => {
    // Extracting parameters from request
    const { id: _id } = req.params;
    const { value, userId } = req.body;

    // Checking if the question id is valid
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable...");
    }

    try {
        // Finding the question by id
        const question = await Questions.findById(_id);

        // Finding the index of user's upvote and downvote in the question's upVotes and downVotes arrays
        const upIndex = question.upVotes.findIndex((id) => id === String(userId));
        const downIndex = question.downVotes.findIndex((id) => id === String(userId));

        // Handling upvote operation
        if (value === 'upvote') {
            if (downIndex !== -1) {
                // If user had previously downvoted, remove the downvote
                question.downVotes = question.downVotes.filter((id) => id !== String(userId));
            }
            if (upIndex === -1) {
                // If user had not upvoted before, add the upvote
                question.upVotes.push(userId);
            } else {
                // If user had already upvoted, remove the upvote
                question.upVotes = question.upVotes.filter((id) => id !== String(userId));
            }
        }
        // Handling downvote operation
        else if (value === 'downvote') {
            if (upIndex !== -1) {
                // If user had previously upvoted, remove the upvote
                question.upVotes = question.upVotes.filter((id) => id !== String(userId));
            }
            if (downIndex === -1) {
                // If user had not downvoted before, add the downvote
                question.downVotes.push(userId);
            } else {
                // If user had already downvoted, remove the downvote
                question.downVotes = question.downVotes.filter((id) => id !== String(userId));
            }
        }

        // Updating the question document in the database
        await Questions.findByIdAndUpdate(_id, question);
        res.status(200).json("Voted successfully");
    } catch (error) {
        console.log("error in voting", error.message);
        res.status(400).json(error.message);
    }
};
