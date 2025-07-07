// controllers/commentController.js
import Comment from "../models/Comment.js";

// Add a comment to a post
export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;

    const newComment = await Comment.create({
      content,
      postId,
      userId: req.user._id,
    });
    const populatedComment = await newComment.populate("userId", "name");
    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment", error: error.message });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Allow only the comment author or admin to delete
    if (
      comment.userId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete comment", error: error.message });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ postId })
      .populate("userId", "name") // 👈 populate only the name of the user
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments", error: error.message });
  }
};