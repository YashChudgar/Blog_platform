// controllers/likeController.js
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
