import User from '../models/auth.js'
import stripe from 'stripe';
import moment from 'moment';
/*********** create subscription ************/
const stripePackage = stripe(process.env.STRIPE_PRIVATE_KEY)

const stripeSession = async (plan , customerId) => {
    const user = await User.findOne({ stripeCustomerId: customerId });
    if (!user) {
        throw new Error('User not found');
    }
    try {
        const session = await stripePackage.checkout.sessions.create(
            {
            mode: "subscription",
            payment_method_types: ["card"],
            currency: 'inr',
            line_items: [
                {
                    price: plan,
                    quantity: 1
                },
            ],
            success_url: "http://localhost:3000/api/payment-success",
            cancel_url: "http://localhost:3000",
            customer: customerId,
        },
        {
            apiKey : process.env.STRIPE_SECRET_KEY
        });

        return session;
    }catch (error){
        throw error;
    }
};

export const stripeSubscription = async (req, res) => {
    const { plan, customerId } = req.body;
    try {
        const session = await stripeSession(plan, customerId);
        return res.json({ session });
    } catch (error) {
        console.error("Error in stripeSubscription:", error);
        return res.status(500).json({ error: "An error occurred while processing the subscription." });
    }
};

export const paymentSuccess = async (req, res) => {
    const { sessionId, userId } = req.query; // Assuming Stripe sends parameters as query parameters

    try {
        // Retrieve session details from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Check if payment was successful
        if (session.payment_status === 'paid') {
            const subscriptionId = session.subscription;
            try {
                // Retrieve subscription details from Stripe
                const subscription = await stripe.subscriptions.retrieve(subscriptionId);

                // Retrieve user from MongoDB
               const user = await User.findOne({ stripeCustomerId: customerId });
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }

                // Update user's subscription array with the new subscription details
                const newSubscription = {
                    plan: subscription.plan.id,
                    startDate: moment.unix(subscription.startDate).format('YYYY-MM-DD'),
                    endDate: moment.unix(subscription.endDate).format('YYYY-MM-DD')
                };

                user.subscription.push(newSubscription);
                await user.save();

                return res.json({ message: "Payment successful" });
            } catch (error) {
                console.error('Error retrieving subscription:', error);
                return res.status(500).json({ error: "An error occurred while processing the subscription." });
            }
        } else {
            return res.json({ message: "Payment failed" });
        }
    } catch (error) {
        console.error('Error retrieving session:', error);
        return res.status(500).json({ error: "An error occurred while retrieving session details." });
    }
};

export const getDetails = async (req, res) => {
    
    try {
        const customerId = req.body
        const subscriptions = await stripePackage.subscriptions.list(
            {
                customer: customerId
            },
            {
                apiKey: process.env.STRIPE_SECRET_KEY,
            }
        );

        if (!subscriptions.data.length) {
            return res.json([1]);
        }

        res.json(subscriptions.data.plan);
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        res.status(500).json({ error: "Failed to fetch subscriptions." });
    }
};

