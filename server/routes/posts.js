// Import necessary modules and functions
import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

// Create an instance of the Express router
const router = express.Router();

// Read Operations

// Route to fetch feed posts for the authenticated user
router.get("/", verifyToken, getFeedPosts); 
// This route shows everyone's posts at home that the user follows.
// The getFeedPosts function is expected to use AI and machine learning algorithms
// to show user-related posts.

// Route to fetch posts of a specific friend when the user opens someone's profile
router.get("/:userId/posts", verifyToken, getUserPosts);
// This route is designed to display posts of a specific friend when the user visits
// someone's profile.

// Update Operation

// Route to handle liking a post for like button
router.patch("/:id/like", verifyToken, likePost);
// This route allows the authenticated user to like a specific post identified by :id.

// Export the router for use in other parts of the application
export default router;









