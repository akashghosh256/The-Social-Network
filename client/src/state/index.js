// Importing createSlice function from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";
// This is basically our entire State this will be all the logic that we'll need for the entire
// 2:03:38
// application for Redux and then finally we just have to configure a few things
// 2:03:45
// specifically more so for persist it but we're going to set the reducer inside our index.js file

// Initial state of the authentication slice--------------------------
// This essentially will be the state that
// 1:55:43
// will be stored in our Global state so this type of information this basically this data will be accessible throughout
// our entire application and we can grab it anywhere we want so we don't have to
// pass in State and properties down to different components
// now again I really highly recommend Redux and toolkit if you're using Redux you should always
// use toolkit now and among all the State Management libraries

// setting our entire state
const initialState = {
  mode: "light",   // Default mode is set to "light"
  user: null,      // No user authenticated initially
  token: null,     // No token initially
  posts: [],       // Empty array for posts
};

// Creating the authentication slice using createSlice
// functions that involve modifying the global State that's the only difference in this in a
// 1:57:56
// regular function I'm not sure why people always use fancy terms to describe it but these are just functions that do
// 1:58:02
// what you need 
export const authSlice = createSlice({
  name: "auth",   // Name of the slice
  initialState,   // Initial state defined above
  reducers: {
    // Toggle between light and dark modes
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // Set user login information (user object and token)

    // function all right and then set login we'll have state and action so action is
    // 1:59:23
    // going to be just like functions this is where you set they call it payload but it's basically
    // 1:59:28
    // just the params or arguments for the function that's what all that means and then from here we're going to say
    // 1:59:34
    // state.user is going to be equal to action.payload dot user so in our payload this is the
    // 1:59:41
    // parameter we're sending a user parameter from this function and then we're going to say state.token
    // 1:59:46
    // will be action.payload .com so basically these this includes
    // 1:59:52
    // all the arguments so action.user action.token action.payload.useraction.payload dot
    
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Clear user information on logout
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    // Set friends for the authenticated user
    setFriends: (state, action) => {
      // Check if user exists before updating friends
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    // Set an array of posts
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    // Update a specific post in the array
    setPost: (state, action) => {
      // Map through posts and replace the one with matching ID
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

// Exporting action creators from the slice
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;

// Exporting the reducer function
export default authSlice.reducer;


