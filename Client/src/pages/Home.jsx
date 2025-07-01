import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to BlogSphere</h1>
      <p className="text-gray-600 mb-6">Create, explore, and share amazing blog posts.</p>
      <div className="flex justify-center gap-4">
        <Link to="/login" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Login</Link>
        <Link to="/register" className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">Register</Link>
      </div>
    </div>
  );
};

export default Home;
