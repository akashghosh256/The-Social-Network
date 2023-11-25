import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
    try {
        // Extract the user ID from the request parameters
        const { id } = req.params;

        // Find the user by ID in the database
        const user = await User.findById(id);

        // Respond with the user details in JSON format
        res.status(200).json(user);
    } catch (err) {
        // If an error occurs, respond with a 404 status code and an error message
        res.status(404).json({ message: err.message });
    }
}

export const getUserFriends = async (req, res) => {
    try {
        // Extract the user ID from the request parameters
        const { id } = req.params;

        // Find the user by ID in the database
        const user = await User.findById(id);

        // Retrieve the friends of the user
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        // Format the friend details before responding
        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        });

        // Respond with the formatted friend details in JSON format
        res.status(200).json(formattedFriends);
    } catch (err) {
        // If an error occurs, respond with a 404 status code and an error message
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE - Add or Remove User Friends */
export const addRemoveFriend = async (req, res) => {
    try {
        // Extract user ID and friend ID from the request parameters
        const { id, friendId } = req.params;

        // Find the user and friend by their respective IDs in the database
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        // Check if the friend is already in the user's friend list
        if (user.friends.includes(friendId)) {
            // If yes, remove the friend from the user's list and vice versa
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== friendId);
        } else {
            // If not, add the friend to the user's list and vice versa
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        // Save the updated user and friend details to the database
        await user.save();
        await friend.save();

        // Retrieve the updated list of friends for the user
        const updatedFriends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        // Format the updated friend details before responding
        const formattedFriends = updatedFriends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        });

        // Respond with the formatted friend details in JSON format
        res.status(200).json(formattedFriends);
    } catch (err) {
        // If an error occurs, respond with a 404 status code and an error message
        res.status(404).json({ message: err.message });
    }
};
