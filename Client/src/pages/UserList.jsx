import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axiosInstance.delete(`/admin/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Failed to delete user", err);
      alert("Failed to delete user.");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        👥 User Management
      </h1>

      <div className="mb-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
  <input
    type="text"
    placeholder="Search by name or email..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full sm:w-96 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-indigo-400"
  />
</div>


      <motion.ul
        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {filteredUsers.map((user) => (
          <motion.li
            key={user._id}
            variants={item}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    user.role === "admin"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-between gap-2">
              <Link
                to={`/admin/users/${user._id}`}
                className="flex-1 inline-flex justify-center items-center gap-1 px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                <Pencil size={16} /> View/Edit
              </Link>
              <button
                onClick={() => handleDelete(user._id)}
                className="flex-1 inline-flex justify-center items-center gap-1 px-4 py-2 text-sm font-medium bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </motion.li>
        ))}
      </motion.ul>

      {filteredUsers.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No users found.</p>
      )}
    </div>
  );
};

export default UserList;
