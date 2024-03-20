import mongoose from 'mongoose';
import  {filterProfanity} from '../utility/profanityFilter.js';
import { curseWords } from "../utility/profanityFilter.js";

 const askQuestionSchema = mongoose.Schema({
    upVotes : {type: [String] , default: []},
    downVotes : {type: [String] , default: [] },
    questionTitle: {type: String, required: true},
    questionBody: {type: String, required: true},
    questionTags: {type: [String], required: true},
    UserId: {type: String , required: true},
    noOfAnswers: {type: Number, default: 0},
    userPosted : {type: String , required: true},
    askedOn: {type: Date , default: Date.now()} ,
    answer : [{
        answerBody : {type: String},
        userAnswered : {type:String},
        userId: {type:String},
        answeredOn: {type: Date , default: Date.now()}
    }]
})


// Apply profanity filter to questionTitle and questionBody fields
// Apply profanity filter to answerBody field in each answer
// askQuestionSchema.pre("save", async function () {
//     this.questionTitle = await filterProfanity(this.questionTitle, curseWords);
//     this.questionBody = await filterProfanity(this.questionBody, curseWords);

//     this.answer = await Promise.all(this.answer.map(async answer => {
//         answer.answerBody = await filterProfanity(answer.answerBody, curseWords);
//         return answer;
//     }));
// });


export default mongoose.model("Questions" , askQuestionSchema)