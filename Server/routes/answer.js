import express from 'express';
import mongoose from 'mongoose';
import {postAnswer , deleteAnswer} from '../controllers/Answers.js'
import auth from '../middlewares/auth.js';

const router = express.Router();

router.patch('/post/:id' , auth, postAnswer) //patch is used to manipulate particular data in the database

router.patch('/delete/:id' ,auth, deleteAnswer) //delete Answer

export default router