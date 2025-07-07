import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getMyPosts,
  getPostsByTag,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Standard route to create a post or get all posts
router.route("/").post(protect, createPost).get(getAllPosts);

// Custom route to get only posts by logged-in user
router.get("/mine", protect, getMyPosts);

//post routes
router.get("/tag/:tag", getPostsByTag);

// Individual post routes
router
  .route("/:id")
  .get(getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);


export default router;
