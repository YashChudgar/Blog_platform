// controllers/commentController.js
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

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

    const post = await Post.findById(comment.postId);
    if (!post) return res.status(404).json({ message: "Associated post not found" });

    const isCommentAuthor = comment.userId.toString() === req.user._id.toString();
    const isPostAuthor = post.authorId.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isCommentAuthor && !isPostAuthor && !isAdmin) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
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
      .sort({ createdAt: -1 }) // newest first
      .lean();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments", error: error.message });
  }
};

export const getCommentedPosts = async (req, res) => {
  try {
    const userId = req.user._id;

    const comments = await Comment.find({ userId }).select("postId");
    const postIds = [...new Set(comments.map((c) => c.postId.toString()))]; // Unique IDs

    const posts = await Post.find({ _id: { $in: postIds } }).populate("authorId", "name");

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching commented posts:", error);
    res.status(500).json({ message: "Failed to fetch commented posts" });
  }
};