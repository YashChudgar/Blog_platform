// controllers/likeController.js
import Post from "../models/Post.js";
import Like from "../models/Like.js";

export const toggleLike = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  const existing = await Like.findOne({ postId, userId });
  if (existing) {
    await Like.deleteOne({ _id: existing._id });
    return res.status(200).json({ liked: false });
  } else {
    await Like.create({ postId, userId });
    return res.status(201).json({ liked: true });
  }
};

export const getLikeStatus = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  const liked = await Like.exists({ postId, userId });
  const total = await Like.countDocuments({ postId });

  res.json({ likedByCurrentUser: !!liked, total });
};

export const getLikedPosts = async (req, res) => {
  try {
    const userId = req.user._id;

    const likes = await Like.find({ userId }).select("postId");
    const postIds = likes.map((like) => like.postId);

    const posts = await Post.find({ _id: { $in: postIds } }).populate("authorId", "name");

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching liked posts:", error);
    res.status(500).json({ message: "Failed to fetch liked posts" });
  }
};