import express from 'express';
import { signin , signup , googleSignIn} from '../controllers/auth.js'
import {getAllUsers, updateProfile , sendOTPByEmail , verifyOtp} from '../controllers/Users.js'
import auth from '../middlewares/auth.js';
import singleUpload from "../middlewares/multer.js" 

const router = express.Router();

router.post('/signin' , signin);
router.post('/signup' , signup);
router.post('/googleSigning' , googleSignIn);

router.get('/getAllUsers', getAllUsers);

router.patch('/update/:id', auth , singleUpload , updateProfile);
router.post('/otp-email/:id', auth , sendOTPByEmail );
router.post('/verify-email' , verifyOtp );


export default router