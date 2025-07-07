// src/pages/TagPosts.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const TagPosts = () => {
  const { tag } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaggedPosts = async () => {
      try {
        const res = await axiosInstance.get(`/posts/tag/${tag}`);
        setPosts(res.data);
      } catch (err) {
        console.error("Error loading tagged posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTaggedPosts();
  }, [tag]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">
        Posts Tagged: #{tag}
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No posts found with this tag.</p>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link
              key={post._id}
              to={`/post/${post._id}`}
              className="block border rounded p-4 hover:bg-gray-50 transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-1">{post.title}</h2>
              <p className="text-sm text-gray-600">
                By {post.authorId?.name || "Unknown"} on{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mt-2 line-clamp-2">{post.content.replace(/<[^>]+>/g, "")}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagPosts;
