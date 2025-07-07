import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-gray-800">
      <motion.h1
        className="text-4xl font-bold text-indigo-700 mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Contact Us
      </motion.h1>
      <p className="text-center text-gray-600 mb-10">
        We'd love to hear from you! Fill out the form below and we'll respond shortly.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg space-y-6"
      >
        <div>
          <label className="block mb-2 text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Message</label>
          <textarea
            name="message"
            rows="4"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
