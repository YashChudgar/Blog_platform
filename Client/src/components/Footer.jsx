import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t text-gray-600 py-6 text-sm mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} Inkspire. All rights reserved.</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <Link to="/about" className="hover:text-indigo-600">About</Link>
          <Link to="/contact" className="hover:text-indigo-600">Contact</Link>
          <Link to="/terms" className="hover:text-indigo-600">Terms</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
