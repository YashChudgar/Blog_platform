import React from "react";
import { Link } from "react-router-dom";
import { PenTool } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const handleCategoryClick = (cat) => {
  navigate(`/tag/${encodeURIComponent(cat)}`);
};

  return (
<footer className="bg-indigo-50 border-t border-indigo-100 text-gray-700 pt-12 pb-6 px-4 mt-20 sm:mt-24 shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo + Description */}
        <div>
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-xl mb-2">
            <PenTool className="w-6 h-6" />
            Inkspire
          </div>
          <p className="text-sm text-gray-600">
            Inkspire is a modern blogging platform built for writers who want
            to express, connect, and inspire with ease and creativity.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-indigo-600">Home</Link></li>
            <li><Link to="/about" className="hover:text-indigo-600">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-600">Contact</Link></li>
            <li><Link to="/terms" className="hover:text-indigo-600">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Features */}
      <div>
          <h4 className="font-semibold text-gray-800 mb-3">Features</h4>
          <ul className="space-y-2 text-sm">
            <li>Distraction-Free Writing</li>
            <li>Real-time Engagement</li>
            <li>Smart Content Discovery</li>
            <li>Build Your Audience</li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Popular Categories</h4>
          <ul className="space-y-2 text-sm">
  {["Technology", "Lifestyle", "Writing Tips", "Education"].map((cat, i) => (
    <li key={i}>
      <button
        onClick={() => handleCategoryClick(cat)}
        className="hover:text-indigo-600 text-left w-full"
      >
        {cat}
      </button>
    </li>
  ))}
</ul>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Inkspire. Crafted with ✍️ & passion by writers, for writers.
      </div>
    </footer>
  );
};

export default Footer;
