import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useSelector } from "react-redux";
import { Pencil, Trash, Heart, HeartOff, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const ViewPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const fetchPost = async () => {
    try {
      const res = await axiosInstance.get(`/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      setError("Failed to load post.");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axiosInstance.get(`/comments/${id}`);
      setComments(res.data);
    } catch (err) {
      console.error("Failed to load comments");
    }
  };

  const fetchLikes = async () => {
    try {
      const res = await axiosInstance.get(`/likes/${id}`);
      setLikesCount(res.data.total);
      setLiked(res.data.likedByCurrentUser);
    } catch (err) {
      console.error("Failed to fetch like status");
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
    fetchLikes();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axiosInstance.delete(`/posts/${id}`);
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to delete post.");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const res = await axiosInstance.post(`/comments/${id}`, { content: newComment });
      setComments([res.data, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error("Add comment failed", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axiosInstance.delete(`/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Delete comment failed", err);
    }
  };

  const handleToggleLike = async () => {
    try {
      await axiosInstance.post(`/likes/${id}`);
      setLiked(!liked);
      setLikesCount((prev) => prev + (liked ? -1 : 1));
    } catch (err) {
      console.error("Toggle like failed", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!post) return <p className="text-center mt-10">Post not found.</p>;

  const isAuthor = user && user.id === post.authorId?._id;
  const isAdmin = user?.role === "admin";

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen py-10">
      <motion.div
        className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-indigo-800 mb-1">{post.title}</h1>
            <p className="text-sm text-gray-500">
              By {post.authorId?.name || "Unknown"} • {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
          {(isAuthor || isAdmin) && (
            <div className="flex gap-3">
              <Link to={`/edit/${post._id}`} className="text-blue-600 hover:underline flex items-center gap-1">
                <Pencil size={18} /> Edit
              </Link>
              <button onClick={handleDelete} className="text-red-600 hover:underline flex items-center gap-1">
                <Trash size={18} /> Delete
              </button>
            </div>
          )}
        </div>

        <div className="prose prose-indigo max-w-none mb-6" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="flex items-center gap-6 mb-6">
          <button onClick={handleToggleLike} className="flex items-center gap-1 text-pink-600 font-medium">
            {liked ? <Heart fill="currentColor" size={20} /> : <HeartOff size={20} />} {likesCount}
          </button>
          <span className="flex items-center gap-1 text-gray-600">
            <MessageCircle size={18} /> {comments.length} Comments
          </span>
        </div>

        {post.tags?.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, i) => (
                <span key={i} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 bg-indigo-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-indigo-800 mb-4">Comments</h3>

          {user && (
            <form onSubmit={handleAddComment} className="flex gap-2 mb-6">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Write a comment..."
                required
              />
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                type="submit"
              >
                Post
              </button>
            </form>
          )}

          {comments.length === 0 ? (
            <p className="text-gray-500 text-sm">No comments yet.</p>
          ) : (
            <div className="space-y-4">
              {comments.map((c) => (
                <motion.div
                  key={c._id}
                  className="bg-white border border-gray-200 p-3 rounded-lg shadow"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-800">
                      {String(c.userId?._id || c.userId) === String(user?.id)
                        ? "You"
                        : c.userId?.name || "Anonymous"}
                    </p>
                    {(user?.id === c.userId?._id || isAdmin) && (
                      <button
                        onClick={() => handleDeleteComment(c._id)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm mt-1">{c.content}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ViewPost;
