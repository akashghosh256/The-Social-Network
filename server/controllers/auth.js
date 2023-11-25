// Import necessary modules
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Assuming the correct path to the User model

/* REGISTER USER */

export const register = async (req, res) => {
    try {
        // Destructuring user details from request body
        const {
            firstname,
            lastname,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        // Provide security for password using hashing
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Create a new User instance with hashed password
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });

        // Trying to save the user to the database
        const savedUser = await newUser.save();

        // Respond with a 201 status code (Created) and the saved user details in JSON format
        res.status(201).json(savedUser);
        // The HTTP status code "201 Created" is a standard response 
        // code indicating that the request has been fulfilled and 
        // resulted in the creation of a new resource.
    } catch (error) {
        // If an error occurs during registration, respond with an error status and message
        res.status(500).json({ error: "Registration failed." });
    }
};

/* Logging IN - basic way, may not be very secure there are other ways to do it */
export const login = async (req, res) => {
    try {
        // Destructuring email and password from the request body
        const { email, password } = req.body;

        // Find the user with the provided email in the database
        const user = await User.findOne({ email: email });

        // Check if the user exists
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        // If passwords do not match, return an error
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid password" });
        }

        // If authentication is successful, generate a JSON Web Token (JWT)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // Remove the password from the user object before sending it in the response for security 
        delete user.password;

        // Respond with a 200 status code (OK), the JWT token, and the user details in JSON format
        res.status(200).json({ token, user });
    } catch (err) {
        // If an error occurs during login, respond with a 500 status code and an error message
        res.status(500).json({ error: err.message });
    }
};







