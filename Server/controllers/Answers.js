import mongoose from "mongoose";
import Questions from "../models/questions.js";

/*POST*/ 
export const postAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { noOfAnswers, answerBody, userAnswered, userId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }
  updateNoOfQuestions(_id, noOfAnswers);
  
  try {
    const updatedQuestion = await Questions.findByIdAndUpdate(_id, {
      $addToSet: { answer: [{ answerBody, userAnswered, userId }] },
    });
    res.status(200).json({success: true, message: "Answer posted successfully"});
  } catch (error) {
    res.status(400).json("error in updating");
  }
};

/*PATCH*/ 
const updateNoOfQuestions = async (_id, noOfAnswers) => {
  try {
    await Questions.findByIdAndUpdate(_id, {
      $set: { noOfAnswers: noOfAnswers },
    });
  } catch (error) {
    console.log(error);
  }
};

/*DELETE*/ 
export const deleteAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { answerId, noOfAnswers } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }
  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    return res.status(404).send("Answer unavailable...");
  }
  try {
    // Remove the answer from the question
    await Questions.findOneAndUpdate(
      { _id },
      { $pull: { 'answer': { _id: answerId } } }
    );
    // Update the number of answers
    await Questions.findByIdAndUpdate(
      _id,
      { $set: { noOfAnswers: noOfAnswers } }
    );
    res.status(200).send({ success: true ,message: "Answer deleted successfully."});
  } catch (error) {
    console.log("Error in deleteAns", error.message);
    res.status(500).send("Internal Server Error");
  }
};