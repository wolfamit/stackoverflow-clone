import jwt from 'jsonwebtoken';

const auth = (req, res , next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let decodedData = jwt.verify(token , process.env.SECRET_KEY )
        req.userId = decodedData?.id
        next();
    } catch (error) {
        console.log("Failed to authenticate user" , error.message);
        return res.status(401).json({ message: "Failed to authenticate user" }); // Return an appropriate error responsev
    }
};

export default auth