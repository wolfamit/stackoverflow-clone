import express from 'express';
import auth from '../middlewares/auth.js';
import { paymentSuccess } from '../controllers/stripeSubscription.js';

const router = express.Router();

// Define webhook endpoint with POST method
router.post('/webhook', auth, paymentSuccess);


export default router