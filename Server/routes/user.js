import express from 'express';
import { signin , signup } from '../controllers/auth.js'
import {getAllUsers, updateProfile , patchPhNumber} from '../controllers/Users.js'
import auth from '../middlewares/auth.js';
import singleUpload from "../middlewares/multer.js" 

const router = express.Router();

router.post('/signin' , signin);
router.post('/signup' , signup);

router.get('/getAllUsers', getAllUsers);

router.patch('/update/:id', auth , singleUpload , updateProfile);
router.patch('/updatePhoneNumber/:id', auth , patchPhNumber);


export default router