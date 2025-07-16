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

  // ✅ Renamed correctly
  const handleSubmitWithStatus = async (status) => {
    const token = localStorage.getItem("token");
    if (!token) return setError("You must be logged in to publish a post.");

    try {
      const res = await axiosInstance.post(
        "/posts",
        {
          title,
          content,
          tags: tags.split(",").map((t) => t.trim()),
          status,
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
      className="p-6 sm:p-10 max-w-5xl mx-auto bg-gradient-to-br from-white via-indigo-50 to-purple-100 rounded-xl shadow-2xl mt-12 mb-16 border border-indigo-200"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-transparent bg-clip-text pb-1 leading-tight">
        ✍️ Create a New Blog Post
      </h2>

      {error && <p className="text-red-600 text-center mb-4 font-semibold">{error}</p>}

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-indigo-700 mb-1">Post Title</label>
          <input
            type="text"
            placeholder="Enter post title"
            className="w-full p-3 border border-indigo-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-indigo-700 mb-1">Tags</label>
          <input
            type="text"
            placeholder="e.g. react, javascript, blogging"
            className="w-full p-3 border border-purple-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">Separate multiple tags with commas</p>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-indigo-700 mb-1">Content</label>
          <div className="rounded-lg overflow-hidden border-2 border-indigo-400 transition">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              className="custom-quill-editor"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => handleSubmitWithStatus("published")}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 transform transition duration-300 hover:from-indigo-600 hover:to-pink-500"
          >
            🚀 Publish Post
          </button>
          <button
            type="button"
            onClick={() => handleSubmitWithStatus("draft")}
            className="bg-gradient-to-r from-gray-400 to-gray-600 text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 transform transition duration-300 hover:from-gray-500 hover:to-gray-700"
          >
            💾 Save as Draft
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreatePost;
