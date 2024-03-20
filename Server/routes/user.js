import express from 'express';
import { signin , signup } from '../controllers/auth.js'
import {getAllUsers, updateProfile} from '../controllers/Users.js'
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/signin' , signin);
router.post('/signup' , signup);

router.get('/getAllUsers', getAllUsers);

router.patch('/update/:id', auth , updateProfile);


export default router