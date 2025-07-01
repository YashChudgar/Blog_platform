import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../api/axiosInstance"; // Ensure this exists
import { useNavigate } from "react-router-dom";

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
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-4">Create a New Blog Post</h2>
      {error && <p className="text-red-600 text-center">{error}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="w-full p-3 border rounded"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <ReactQuill theme="snow" value={content} onChange={setContent} className="bg-white" />
        <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
