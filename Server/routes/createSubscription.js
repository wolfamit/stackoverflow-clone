import express from 'express'
import { stripeSubscription , paymentSuccess , getDetails } from '../controllers/stripeSubscription.js'
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/create-subscription-checkout-session', stripeSubscription)
router.post('/payment-success'  , paymentSuccess)
router.get('/get-details' , getDetails)
export default router