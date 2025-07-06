import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PenTool,
  UserPlus,
  FileText,
  Search,
  MessageSquareHeart,
  Users,
  BookOpen,
} from "lucide-react";

const features = [
  {
    icon: <PenTool size={28} className="text-indigo-600" />,
    title: "Seamless Writing",
    desc: "Craft beautiful articles with our rich, distraction-free editor.",
  },
  {
    icon: <UserPlus size={28} className="text-indigo-600" />,
    title: "Build Your Audience",
    desc: "Attract readers who love your content and voice.",
  },
  {
    icon: <MessageSquareHeart size={28} className="text-indigo-600" />,
    title: "Real-time Engagement",
    desc: "Receive feedback, likes, and comments instantly.",
  },
  {
    icon: <Search size={28} className="text-indigo-600" />,
    title: "Smart Discovery",
    desc: "Readers can discover your blogs through advanced search & tags.",
  },
];

const categories = [
  "Technology",
  "Lifestyle",
  "Travel",
  "Finance",
  "Health",
  "Food",
  "Education",
  "Writing Tips",
];

const Landing = () => {
  return (
    <div className="text-gray-800">
      {/* Hero */}
      <section className="bg-indigo-50 py-24 px-4 text-center overflow-hidden">
        <motion.h1
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold text-indigo-700"
        >
          Welcome to Inkspire ✍️
        </motion.h1>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg text-gray-600 max-w-xl mx-auto"
        >
          Share your thoughts, inspire others, and grow your writing journey — one post at a time.
        </motion.p>
        <motion.div
          className="mt-8 flex justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition"
          >
            Log In
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Why Inkspire?
          </motion.h2>
          <p className="text-gray-500 mt-2">Everything a modern writer needs in one place.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md"
              >
                {f.icon}
                <h3 className="text-lg font-semibold mt-4">{f.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-indigo-100 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Popular Blog Categories
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                className="bg-white px-4 py-3 rounded-lg shadow hover:bg-indigo-600 hover:text-white font-medium transition"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                {cat}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      {/* How It Works - Cards Style */}
<section className="bg-white py-20 px-4">
  <div className="max-w-6xl mx-auto text-center">
    <motion.h2
      className="text-3xl font-bold text-gray-800"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      How It Works
    </motion.h2>
    <p className="text-gray-500 mt-2">Just a few steps to start your blogging journey</p>

    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12">
      {[
        {
          step: "1",
          title: "Sign Up",
          desc: "Create your free Inkspire account with just an email.",
        },
        {
          step: "2",
          title: "Write Blogs",
          desc: "Use our beautiful editor to craft your posts with images, code, and formatting.",
        },
        {
          step: "3",
          title: "Publish",
          desc: "Hit publish and your post goes live instantly for the world to read.",
        },
        {
          step: "4",
          title: "Engage",
          desc: "Receive feedback from readers through likes and comments.",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
          className="bg-indigo-50 rounded-xl p-6 shadow-md border border-indigo-100 hover:shadow-lg transition"
        >
          <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg mx-auto">
            {item.step}
          </div>
          <h3 className="text-lg font-semibold mt-4 text-indigo-700">{item.title}</h3>
          <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* CTA */}
      <section className="bg-indigo-600 text-white py-16 px-4 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold">Start your blog in minutes</h2>
          <p className="mt-3 text-lg">Join thousands of writers already using Inkspire</p>
          <Link
            to="/register"
            className="mt-6 inline-block bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Join Now
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Landing;
