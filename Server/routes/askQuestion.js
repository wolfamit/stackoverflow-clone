import express from 'express'
import  { getAllQuestion , askQuestion , deleteQuestion , voteQuestion } from '../controllers/Question.js'
import auth from '../middlewares/auth.js';
import postLimit from '../middlewares/postLimit.js';

const router = express.Router();

router.post('/Ask', auth  , postLimit , askQuestion);
router.get('/get', getAllQuestion);
router.delete(`/delete/:id`, auth , deleteQuestion);
router.patch('/vote/:id',auth ,voteQuestion);

export default router