import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { motion } from "framer-motion";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    axiosInstance.get(`/admin/users/${id}`).then((res) => {
      setUser(res.data);
      setFormData({ name: res.data.name, email: res.data.email, role: res.data.role });
    });
    axiosInstance.get(`/admin/posts/user/${id}`).then((res) => setPosts(res.data));
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axiosInstance.put(`/admin/users/${id}`, formData);
      setUser(res.data);
      setEditMode(false);
      alert("✅ User updated successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update user");
    }
  };

  if (!user) return <p className="text-center text-gray-500 mt-10">Loading user...</p>;

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">👤 User Profile</h2>

      <motion.div
        className="bg-white p-6 rounded-xl shadow-md space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {editMode ? (
          <>
            <div>
              <label className="block font-medium text-sm text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-sm text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-sm text-gray-700">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                💾 Save Changes
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="text-gray-500 underline text-sm hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p>
              <strong className="text-gray-700">Name:</strong> {user.name}
            </p>
            <p>
              <strong className="text-gray-700">Email:</strong> {user.email}
            </p>
            <p>
              <strong className="text-gray-700">Role:</strong> {user.role}
            </p>
            <button
              onClick={() => setEditMode(true)}
              className="mt-3 text-indigo-600 font-medium hover:underline"
            >
              ✏️ Edit User
            </button>
          </>
        )}
      </motion.div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📝 Posts by {user.name}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <motion.div
              key={post._id}
              className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.02 }}
            >
              <Link to={`/post/${post._id}`}>
                <h4 className="font-semibold text-indigo-600 hover:underline text-lg">{post.title}</h4>
              </Link>
              <p className="text-sm text-gray-600 mt-1">Status: {post.status}</p>
            </motion.div>
          ))}
        </div>
        {posts.length === 0 && <p className="text-gray-500 text-sm mt-2">No posts found for this user.</p>}
      </div>
    </motion.div>
  );
};

export default UserDetails;
