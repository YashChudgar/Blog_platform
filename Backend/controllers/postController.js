// controllers/postController.js
import Post from "../models/Post.js";

// Create Post
export const createPost = async (req, res) => {
  try {
    const { title, content, tags, status } = req.body;

    const newPost = await Post.create({
      title,
      content,
      tags,
      status,
      authorId: req.user._id,
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Failed to create post", error: error.message });
  }
};

// Get All Posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("authorId", "name");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts", error: error.message });
  }
};

// Get Single Post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("authorId", "name _id");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch post", error: error.message });
  }
};

// Update Post
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const isAuthor = post.authorId.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isAuthor && !isAdmin)
      return res.status(403).json({ message: "Not authorized" });

    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update post", error: error.message });
  }
};


// Delete Post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const isAuthor = post.authorId.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isAuthor && !isAdmin)
      return res.status(403).json({ message: "Not authorized" });

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post", error: error.message });
  }
};


// Get posts of the logged-in user
export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ authorId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching user posts:", err);
    res.status(500).json({ message: "Failed to load your posts" });
  }
};


export const getPostsByTag = async (req, res) => {
  try {
    const tag = req.params.tag;
    const posts = await Post.find({
      tags: { $regex: new RegExp(tag, "i") }, // case-insensitive partial match
    }).populate("authorId", "name");
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts by tag:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

 // Search posts by title or tags

export const searchPosts = async (req, res) => {
  try {
    const query = req.query.q?.trim();
    console.log("Incoming query:", query);
const regex = new RegExp(query, "i");
console.log("Regex used:", regex);
    if (!query) {
      return res.status(400).json({ error: "Search query is required." });
    }

    const posts = await Post.find({
      status: "published",
      $or: [
        { title: { $regex: query, $options: "i" } },
        { tags: { $in: [new RegExp(query, "i")] } }, // ✅ CORRECT regex inside $in
      ],
    });

    console.log("Search results for:", query, "→", posts.length);
    res.status(200).json(posts);
  } catch (err) {
    console.error("Search failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

