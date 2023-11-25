import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ DATA,id: if frontend sends any particular id ( from index.js) we will take it */

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);


/* UPDATE - use for getting friends follow or unfollow */
router.patch("/:id/:friendID", verifyToken, addRemoveFriend);

export default router;
















