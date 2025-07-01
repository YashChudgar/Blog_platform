import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set JWT if stored in localStorage
        const token = localStorage.getItem("token");
        const headers = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [profileRes, postsRes] = await Promise.all([
          axiosInstance.get("/users/profile", headers),
          axiosInstance.get("/posts/mine", headers),
        ]);

        setProfile(profileRes.data);
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

  if (loading) return <div className="text-center p-10 text-gray-600">Loading profile...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Profile</h2>
        <p className="text-gray-600">Name: {profile.name}</p>
        <p className="text-gray-600">Email: {profile.email}</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Posts</h3>
        {posts.length === 0 ? (
          <p className="text-gray-500">You haven’t written any posts yet.</p>
        ) : (
          <ul className="space-y-2">
            {posts.map((post) => (
              <li
                key={post._id}
                className="p-4 border rounded hover:bg-gray-100 transition cursor-pointer"
              >
                📝 {post.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
