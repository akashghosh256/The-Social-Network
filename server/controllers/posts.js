// Import the Post and User models
import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    // Destructure relevant information from the request body
    const { userId, description, picturePath } = req.body;

    // Find the user associated with the post
    const user = await User.findById(userId);

    // Create a new Post instance with user information and post details
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},   //empty object
      comments: [],
    });

    // Save the new post to the database
    await newPost.save();

    // Retrieve all posts after the new post is created
    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (err) {
    // Handle errors by sending an error response with the error message
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    // Retrieve all posts from the database
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    // Handle errors by sending an error response with the error message
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    // Destructure the userId parameter from the request parameters
    const { userId } = req.params;

    // Retrieve posts associated with the specified userId from the database
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (err) {
    // Handle errors by sending an error response with the error message
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    // Destructure the id parameter from the request parameters
    const { id } = req.params;

    // Destructure the userId from the request body
    const { userId } = req.body;

    // Find the post by its id
    const post = await Post.findById(id);

    // Check if the user has already liked the post
    const isLiked = post.likes.get(userId);

    // Toggle the like status
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    // Update the post with the modified likes and retrieve the updated post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    // Send the updated post as a response
    res.status(200).json(updatedPost);
  } catch (err) {
    // Handle errors by sending an error response with the error message
    res.status(404).json({ message: err.message });
  }
};


/*
Your code looks well-structured and syntactically correct. However, here are a few considerations:

1. **Error Handling:**
   It's generally a 
good practice to use more specific HTTP status codes and messages in your error responses to provide more information about the 
nature of the error. For example, you might use `500 Internal Server Error` for unexpected errors and `400 Bad Request` for 
client errors.

   Example:
   ```javascript
   res.status(500).json({ error: "Internal Server Error", message: err.message });
   ```

2. 
**Validation:**
   Ensure that you have proper validation for incoming data, especially in the `createPost` function. Validate that the required fields are 
present and have the expected data types.

   Example:
   ```javascript
   if (!userId || !description || !picturePath) 
{
     return res.status(400).json({ message: "Missing required fields." });
   }
   ```

3. **Security:**
   Make sure to sanitize 
and validate user input to prevent security vulnerabilities like injection attacks. For instance, when using `findById` or `findByIdAndUpdate`, validate that the 
`id` parameter is a valid MongoDB ObjectId.

   Example:
   ```javascript
   const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
   
if (!isValidObjectId) {
     return res.status(400).json({ message: "Invalid ObjectId." });
   }
   ```

4. **Pagination:**
   
If your application grows, consider implementing pagination for fetching posts instead of returning all posts in the `getFeedPosts` and `getUserPosts` functions. 
Returning a large number of posts could impact performance.

Remember, these are just considerations for improving your code. Your code appears to 
be functional, and these suggestions are aimed at enhancing best practices, security, and maintainability. 
 */


















