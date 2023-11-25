// Import necessary modules
import jwt from 'jsonwebtoken';

/* VERIFY AUTHENTICATION TOKEN MIDDLEWARE */

export const verifyToken = async (req, res, next) => {
    try {
        // Retrieve the token from the "Authorization" header in the request
        let token = req.header("Authorization");

        // Check if the token is missing
        if (!token) {
            return res.status(403).send("Access denied");
        }

        // If the token starts with "Bearer ", remove it to get the actual token
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        // Verify the token using the secret key
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the verified user information to the request object for later use in the route handler
        req.user = verified;

        // Move to the next middleware or route handler
        next();
    } catch (err) {
        // If an error occurs during token verification, respond with a 500 status code and an error message
        res.status(500).json({ error: err.message });
    }
};









