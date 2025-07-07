import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { headers: { Authorization: `Bearer ${token}` } };

        const [profileRes, postsRes] = await Promise.all([
          axiosInstance.get("/users/profile", headers),
          axiosInstance.get("/posts/mine", headers),
        ]);

        setProfile(profileRes.data);
        setFormData({
          name: profileRes.data.name,
          email: profileRes.data.email,
          password: "",
          confirmPassword: "",
        });
        setPosts(postsRes.data);
      } catch (err) {
        setError("Failed to load profile or posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      return alert("❌ Password and confirm password do not match!");
    }

    try {
      const token = localStorage.getItem("token");
      const headers = { headers: { Authorization: `Bearer ${token}` } };

      const { name, email, password } = formData;

      const res = await axiosInstance.put("/users/profile", { name, email, password }, headers);

      setProfile(res.data);
      setEditMode(false);
      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Error updating profile");
    }
  };

  if (loading)
    return <div className="text-center p-10 text-gray-600">Loading profile...</div>;
  if (error)
    return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Profile Section */}
      <div className="bg-white shadow-xl rounded-2xl p-6 mb-8 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-indigo-700">Your Profile</h2>
          <button
            className="text-sm text-indigo-600 underline hover:text-indigo-800"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>

        {editMode ? (
          <form onSubmit={handleUpdate} className="space-y-5 animate-fadeIn">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Leave blank to keep current password"
              />
              <button
                type="button"
                className="absolute top-9 right-3 text-gray-500 hover:text-gray-800"
                onClick={togglePassword}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="button"
                className="absolute top-9 right-3 text-gray-500 hover:text-gray-800"
                onClick={togglePassword}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="space-y-1 text-gray-700">
            <p><span className="font-medium">Name:</span> {profile.name}</p>
            <p><span className="font-medium">Email:</span> {profile.email}</p>
          </div>
        )}
      </div>

      {/* Posts Section */}
      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-indigo-700 mb-4">Your Posts</h3>
        {posts.length === 0 ? (
          <p className="text-gray-500">You haven’t written any posts yet.</p>
        ) : (
          <ul className="space-y-3">
            {posts.map((post) => (
              <li key={post._id}>
                <Link
                  to={`/post/${post._id}`}
                  className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
                >
                  📝 {post.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
