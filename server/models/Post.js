// Import Mongoose for defining the schema
import mongoose from "mongoose";

// Define the schema for a post
const postSchema = mongoose.Schema(
  {
    // User ID associated with the post
    userId: {
      type: String,
      required: true,
    },
    // First name of the user who created the post
    firstName: {
      type: String,
      required: true,
    },
    // Last name of the user who created the post
    lastName: {
      type: String,
      required: true,
    },
    // Location associated with the post
    location: String,
    // Description text of the post
    description: String,
    // Path to the picture associated with the post
    picturePath: String,
    // Path to the user's profile picture
    userPicturePath: String,
    // Map to store likes, where keys are user IDs and values are boolean indicating whether the user has liked the post
    likes: {
      type: Map,
      of: Boolean,
    },
    // Array to store comments on the post, initialized with an empty array by default
    comments: {
      type: Array,
      default: [],
    },
  },
  // Enable timestamps to automatically add createdAt and updatedAt fields to the documents
  { timestamps: true }
);

// Create a Mongoose model named "Post" based on the defined schema
const Post = mongoose.model("Post", postSchema);

// Export the Post model for use in other parts of the application
export default Post;
