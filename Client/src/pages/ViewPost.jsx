// src/pages/ViewPost.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useSelector } from "react-redux";
import { Pencil, Trash } from "lucide-react";

const ViewPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosInstance.get(`/posts/${id}`);
        console.log("✅ Post data:", res.data);
        setPost(res.data);
      } catch (err) {
        setError("Failed to load post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axiosInstance.delete(`/posts/${id}`);
      navigate("/dashboard");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete post.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!post) return <p className="text-center mt-10">Post not found.</p>;

const isAuthor =
  user &&
  (user.id === post.authorId?._id || user._id === post.authorId?._id);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
        {isAuthor && (
          <div className="flex gap-4">
            <Link
              to={`/edit/${post._id}`}
              className="flex items-center gap-1 text-blue-600 hover:underline"
            >
              <Pencil size={18} /> Edit Post
            </Link>
            <button
              onClick={handleDelete}
              className="flex items-center gap-1 text-red-600 hover:underline"
            >
              <Trash size={18} /> Delete
            </button>
          </div>
        )}
      </div>

      <p className="text-gray-500 mb-4">
        By {post.authorId?.name || "Unknown"} •{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.tags?.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-gray-700">Tags:</h4>
          <div className="flex flex-wrap gap-2 mt-1">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPost;
