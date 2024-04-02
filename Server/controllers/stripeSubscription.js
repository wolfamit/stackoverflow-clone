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
            success_url: `${process.env.FRONTEND_URL}api/payment-success`,
            cancel_url: `${process.env.FRONTEND_URL}`,
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

const endpointSecret = "whsec_bcg5qvB658BaXseXC2YaqkIOwBJXYKOAz";

export const paymentSuccess = async (req, res) => {
    let event = JSON.stringify(req.body);
    
    const sig = req.headers['stripe-signature'];
    try {
        event = stripePackage.webhooks.constructEvent(
            req.body, 
            sig, 
            endpointSecret
        );
      } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      switch (event.type) {
        case 'checkout.session.completed':
          const checkoutSessionCompleted = event.data.object;
          // Then define and call a function to handle the event checkout.session.completed
          break;
        case 'customer.subscription.created':
          const customerSubscriptionCreated = event.data.object;
          const plan = customerSubscriptionCreated.items.plan.nickname;
          const id = customerSubscriptionCreated.customer;
           // Update user's subscription in your database
           const user = await User.findOneAndUpdate(
            { stripeCustomerId: id },
            {
                $push: {
                    subscription: {
                        plan: plan.toLowerCase(),
                        // Adjust subscription start and end dates according to your requirements
                        startDate: moment().format('YYYY-MM-DD'),
                        endDate: moment().add(1, 'month').format('YYYY-MM-DD')
                    }
                }
            },
            { new: true }
        );
          break;
        case 'invoice.payment_succeeded':
          const invoicePaymentSucceeded = event.data.object;
          // Then define and call a function to handle the event invoice.payment_succeeded
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
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

