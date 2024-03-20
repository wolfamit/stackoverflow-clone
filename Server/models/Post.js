import mongoose from "mongoose";
import  {filterProfanity} from '../utility/profanityFilter.js';
import { curseWords } from "../utility/profanityFilter.js";
const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    videoPath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Apply profanity filter to text fields before saving
postSchema.pre("save", async function () {
  // Apply profanity filter to description field
  this.description = await filterProfanity(this.description, curseWords);
  // Apply profanity filter to comments array
  this.comments = await Promise.all(this.comments.map(async comment => filterProfanity(comment , curseWords)));
});

const Post = mongoose.model("Post", postSchema);

export default Post;