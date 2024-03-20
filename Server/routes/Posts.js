import express from "express";
import {
getFeedPosts,
getUserPosts,
likePost,
postComments,
createPost,
deletePost,
addFriend,
removeFriend
} from "../controllers/createPost.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

/* READ */
router.get("/", getFeedPosts);
router.get("/:userId/posts", auth, getUserPosts);

/* UPDATE */
router.patch("/like/:id", auth, likePost);

router.patch("/comment/:id", auth, postComments);

/* CREATE */
router.post('/post/:userId', auth, createPost);

/*DELETE */
router.delete('/delete/:postId', auth, deletePost)

router.patch("/add/friend/:userId", auth, addFriend);
router.patch("/remove/friend/:userId", auth, removeFriend);

export default router;