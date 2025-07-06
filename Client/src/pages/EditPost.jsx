// src/pages/EditPost.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosInstance.get(`/posts/${id}`);
        setPost(res.data);
        setFormData({
          title: res.data.title,
          content: res.data.content,
          tags: res.data.tags?.join(", ") || "",
        });
      } catch (err) {
        console.error("Failed to fetch post:", err);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleContentChange = (value) =>
    setFormData({ ...formData, content: value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPost = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    try {
      await axiosInstance.put(`/posts/${id}`, updatedPost);
      navigate(`/post/${id}`);
    } catch (err) {
      console.error("Failed to update post:", err);
      alert("Failed to update post.");
    }
  };

  if (!post) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          className="w-full p-3 rounded border"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="tags"
          placeholder="Comma-separated tags"
          className="w-full p-3 rounded border"
          value={formData.tags}
          onChange={handleChange}
        />

        <ReactQuill
          value={formData.content}
          onChange={handleContentChange}
          className="bg-white"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPost;
