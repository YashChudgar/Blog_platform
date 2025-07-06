import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, FileText, Clock, Trash2, Eye, Pencil } from "lucide-react";
import axiosInstance from "../api/axiosInstance";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/posts/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (err) {
      console.error("❌ Failed to load posts:", err);
      setError("Failed to load your posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    setDeleting(postId);
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("❌ Failed to delete post:", err);
      alert("Failed to delete post.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8 text-gray-800">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-indigo-700">Welcome back, Writer ✍️</h1>
            <p className="text-gray-600 mt-1">Here's your activity summary and posts</p>
          </div>
          <Link
            to="/create"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition"
          >
            <PlusCircle size={20} />
            Create New Post
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white shadow-sm p-6 rounded-xl border-l-4 border-indigo-500">
            <h3 className="text-xl font-semibold text-indigo-600">Total Posts</h3>
            <p className="text-3xl mt-2 font-bold">{posts.length}</p>
          </div>
          <div className="bg-white shadow-sm p-6 rounded-xl border-l-4 border-green-500">
            <h3 className="text-xl font-semibold text-green-600">Published</h3>
            <p className="text-3xl mt-2 font-bold">{posts.length}</p>
          </div>
          <div className="bg-white shadow-sm p-6 rounded-xl border-l-4 border-yellow-500">
            <h3 className="text-xl font-semibold text-yellow-600">Drafts</h3>
            <p className="text-3xl mt-2 font-bold">0</p>
          </div>
        </div>

        {/* Post History */}
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FileText size={24} className="text-indigo-600" />
          Your Posts
        </h2>

        {loading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500">You haven’t created any posts yet.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <motion.div
                key={post._id}
                className="bg-white shadow-sm p-6 rounded-xl hover:shadow-md transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {post.content.slice(0, 100)}...
                    </p>
                    <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
                      <Clock size={16} />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 items-end">
                    <Link
                      to={`/post/${post._id}`}
                      className="flex items-center gap-1 text-indigo-600 text-sm font-medium hover:underline"
                    >
                      <Eye size={16} />
                      <span>View</span>
                    </Link>

                    <Link
                      to={`/edit/${post._id}`}
                      className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline"
                    >
                      <Pencil size={16} />
                      <span>Edit</span>
                    </Link>

                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-red-500 text-sm flex items-center gap-1 hover:underline"
                      disabled={deleting === post._id}
                    >
                      <Trash2 size={16} />
                      {deleting === post._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
