import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) return setError("You must be logged in to publish a post.");

    try {
      const res = await axiosInstance.post(
        "/posts",
        {
          title,
          content,
          tags: tags.split(",").map((t) => t.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Post created:", res.data);
      navigate("/profile");
    } catch (err) {
      console.error("Post creation failed:", err);
      setError(err.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <motion.div
      className="p-6 sm:p-10 max-w-5xl mx-auto bg-white rounded-xl shadow-xl mt-12 mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl sm:text-5xl font-bold text-center text-indigo-700 mb-6">
        ✍️ Create a New Blog Post
      </h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
          <input
            type="text"
            placeholder="Enter post title"
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <input
            type="text"
            placeholder="e.g. react, javascript, blogging"
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="bg-white rounded-md border border-gray-300"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-indigo-700 transition duration-300"
          >
            🚀 Publish Post
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreatePost;
