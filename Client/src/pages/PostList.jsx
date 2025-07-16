import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { motion } from "framer-motion";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axiosInstance.get("/admin/posts").then((res) => setPosts(res.data));
  }, []);

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold mb-8 text-indigo-700">📚 All Posts</h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <motion.div
            key={post._id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Link to={`/post/${post._id}`}>
              <div className="bg-gradient-to-br from-white to-indigo-50 hover:to-indigo-100 p-5 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-indigo-700 mb-2 line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                    Author: {post.authorId?.name || "Unknown"}
                  </p>
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {post.content?.slice(0, 120)}...
                  </p>
                </div>
                <div className="mt-4 text-right">
                  <span className="inline-block px-3 py-1 text-xs bg-indigo-100 text-indigo-600 rounded-full">
                    {post.status}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No posts found.</p>
      )}
    </motion.div>
  );
};

export default PostList;
