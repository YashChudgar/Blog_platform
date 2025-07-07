import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20 text-gray-800">
      <motion.h1
        className="text-4xl font-bold text-indigo-700 mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        About Inkspire
      </motion.h1>
      <motion.p
        className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Inkspire is more than a blogging platform — it's a community built for passionate writers, storytellers, and thinkers. Whether you're here to journal your thoughts, share insights, or build a loyal audience, we provide all the tools you need to write beautifully and grow meaningfully.
      </motion.p>

      <div className="mt-12 grid sm:grid-cols-2 gap-8">
        <div className="bg-indigo-50 rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-indigo-700 mb-2">Our Mission</h2>
          <p className="text-gray-600 text-sm">
            Empower every voice. We believe everyone has a story that can inspire, educate, or spark change. Inkspire exists to amplify those voices.
          </p>
        </div>
        <div className="bg-purple-50 rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Our Vision</h2>
          <p className="text-gray-600 text-sm">
            To become the go-to space for creators to write without limits, connect with readers, and build personal brands through content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
