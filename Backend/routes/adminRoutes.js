// routes/adminRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getAllUsers,
  getUserById,
  getAllPosts,
  getPostsByUserId,
  updateUserById,
} from "../controllers/adminController.js";

const router = express.Router();

// Optional: Only allow admin users
const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

// Admin Routes
router.get("/users", protect, adminOnly, getAllUsers);
router.get("/users/:id", protect, adminOnly, getUserById);
router.get("/posts", protect, adminOnly, getAllPosts);
router.get("/posts/user/:id", protect, adminOnly, getPostsByUserId);
router.put("/users/:id", protect, adminOnly, updateUserById); // ✅ Add this

export default router;
