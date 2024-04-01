import User from '../models/auth.js';

const postLimit = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const currentDate = new Date();

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        let postingLimit = 1;
        user.subscription.forEach(sub => {
            if (sub.plan === 'silver') {
                postingLimit = 5;
            } else if (sub.plan === 'gold') {
                postingLimit = Infinity;
            }
        });
        
        // Reset post count for non-gold subscribers if it's a new day
        const lastPostDate = new Date(user.lastPostDate);
        if (!user.subscription.some(sub => sub.plan === 'gold') && currentDate - lastPostDate >= 24 * 60 * 60 * 1000) {
            user.postCount = 0;
        }

        if (user.postCount >= postingLimit) {
            throw new Error('You have reached your daily posting limit.');
        }

        user.postCount++;
        user.lastPostDate = currentDate;
        await user.save();
        next(); // Call next middleware or route handler
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export default postLimit;
