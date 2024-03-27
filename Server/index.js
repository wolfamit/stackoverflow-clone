import express  from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import singleUpload from "./middlewares/multer.js" // multer middleware
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"
import {v2 as cloudinary} from 'cloudinary'

import askQuestionRouter from './routes/askQuestion.js'
import userRouter from './routes/user.js'
import answerRoute from './routes/answer.js'
import auth from "./middlewares/auth.js"
import {createPost} from "./controllers/createPost.js"
import postRoutes from './routes/Posts.js'
import webhook from './routes/Webhook.js' // stripe/webhook route for payment verification 

import createSubscription from './routes/createSubscription.js'
import User from "./models/auth.js"

import Post from "./models/Post.js"
import { users, posts } from "./data/index.js"

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY , 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

dotenv.config();
const app = express();

app.use(express.json({limit: "30mb" , extended: "true"}));
app.use(express.urlencoded({ limit: "30mb" , extended: "true"}));
app.use(helmet()); // security
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common")); //logs HTTP requests made to your server
app.use(cors()); //respond to cross-origin requests from web pages hosted on different domains

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// app.use('/' , async (req, res) => {
//   res.send('server is live');
// })

/* POST ROUTES FOR PUBLIC INTERACTION*/
app.post("/public/post/:id" , auth , singleUpload , createPost);

 // AUTHENTICATION
app.use('/user' , userRouter);

/* ROUTES FOR Q&A */
app.use('/question' , askQuestionRouter);
app.use('/answer' , answerRoute);
app.use("/public", postRoutes);

/* ROUTES FOR subscribing */
app.use('/api' , createSubscription);

/* ROUTES FOR managing response after payment */
app.use('/stripe' , webhook);

const PORT = process.env.PORT || 80;
const MONOGO_DB_URL = process.env.MONOGO_DB_URL;

/* DATABASE CONNECTION */
mongoose.connect(MONOGO_DB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .then(() => {
         /* ADD DATA ONE TIME */
        // User.insertMany(users);
        // Post.insertMany(posts);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
});
