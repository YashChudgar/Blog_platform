import React from "react";
import { motion } from "framer-motion";

const Terms = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20 text-gray-800">
      {/* Header */}
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Terms & Conditions
      </motion.h1>

      <motion.p
        className="text-center text-gray-600 max-w-3xl mx-auto text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Welcome to <span className="font-semibold text-indigo-600">Inkspire</span>! Please read these
        terms carefully before using our platform.
      </motion.p>

      {/* Terms Sections */}
      <div className="mt-12 space-y-8 text-gray-700 text-sm sm:text-base">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-indigo-700 mb-2">
            🧑‍💻 1. User Responsibilities
          </h2>
          <p>
            You agree to use Inkspire in a respectful and lawful manner. Do not
            post offensive, illegal, or plagiarized content. We reserve the
            right to remove any content that violates these rules.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-indigo-700 mb-2">
            ✍️ 2. Content Ownership
          </h2>
          <p>
            You retain full ownership of the content you create. However, by
            publishing on Inkspire, you grant us a non-exclusive license to
            display and promote your work within the platform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-lg font-semibold text-indigo-700 mb-2">
            🔒 3. Privacy
          </h2>
          <p>
            We value your privacy. Any data collected will only be used to
            enhance your experience and will never be sold or misused. Please
            review our <span className="text-indigo-600 underline cursor-pointer">Privacy Policy</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-lg font-semibold text-indigo-700 mb-2">
            🔁 4. Modifications
          </h2>
          <p>
            Inkspire may modify these terms periodically. When we do, we’ll notify
            users via platform announcements or email. Continued use indicates acceptance.
          </p>
        </motion.div>
      </div>

      {/* Last updated */}
      <p className="text-xs text-center text-gray-500 mt-12">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
};

export default Terms;
