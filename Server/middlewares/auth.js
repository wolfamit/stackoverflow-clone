import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('Authorization header missing or invalid');
        }
        
        const token = authHeader.split(' ')[1];
        const decodedData = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decodedData?.id;
        next();
    } catch (error) {
        console.error("Failed to authenticate user:", error.message);
        return res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
    }
};

export default auth;
