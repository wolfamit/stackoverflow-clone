import express from 'express';
import { paymentSuccess } from '../controllers/stripeSubscription.js';

const router = express.Router();

// Define webhook endpoint with POST method
router.post('/webhook',  paymentSuccess);


export default router