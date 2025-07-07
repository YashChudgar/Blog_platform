// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   PenTool,
//   UserPlus,
//   FileText,
//   Search,
//   MessageSquareHeart,
//   Users,
//   BookOpen,
// } from "lucide-react";

// const features = [
//   {
//     icon: <PenTool size={28} className="text-indigo-600" />,
//     title: "Seamless Writing",
//     desc: "Craft beautiful articles with our rich, distraction-free editor.",
//   },
//   {
//     icon: <UserPlus size={28} className="text-indigo-600" />,
//     title: "Build Your Audience",
//     desc: "Attract readers who love your content and voice.",
//   },
//   {
//     icon: <MessageSquareHeart size={28} className="text-indigo-600" />,
//     title: "Real-time Engagement",
//     desc: "Receive feedback, likes, and comments instantly.",
//   },
//   {
//     icon: <Search size={28} className="text-indigo-600" />,
//     title: "Smart Discovery",
//     desc: "Readers can discover your blogs through advanced search & tags.",
//   },
// ];

// const categories = [
//   "Technology",
//   "Lifestyle",
//   "Travel",
//   "Finance",
//   "Health",
//   "Food",
//   "Education",
//   "Writing Tips",
// ];

// const Landing = () => {
//   return (
//     <div className="text-gray-800">
//       {/* Hero */}
//       <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-100 py-24 px-4 overflow-hidden">
//   <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
//     {/* Text Content */}
//     <div className="text-center lg:text-left flex-1">
//       <motion.h1
//         initial={{ y: -60, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//         className="text-5xl sm:text-6xl font-extrabold text-indigo-700 leading-tight"
//       >
//         Welcome to <span className="text-purple-600">Inkspire ✍️</span>
//       </motion.h1>
//       <motion.p
//         initial={{ y: 30, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2 }}
//         className="mt-6 text-lg sm:text-xl text-gray-700 max-w-xl mx-auto lg:mx-0"
//       >
//         Share your thoughts, inspire others, and grow your writing journey — one post at a time.
//       </motion.p>
//       <motion.div
//         className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5 }}
//       >
//         <Link
//           to="/register"
//           className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
//         >
//           Get Started
//         </Link>
//         <Link
//           to="/login"
//           className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition shadow"
//         >
//           Log In
//         </Link>
//       </motion.div>
//     </div>

//     {/* Image */}
//     <motion.div
//       className="flex-1"
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ delay: 0.4 }}
//     >
//       <img
//         src="/Blogging.png" // ✅ Use relative path from public folder
//         alt="Blog illustration"
//         className="w-full max-w-md mx-auto drop-shadow-xl"
//       />
//     </motion.div>
//   </div>
// </section>



//       {/* Features */}
// <section className="py-20 px-4 bg-white">
//   <div className="max-w-6xl mx-auto text-center">
//     <motion.h2
//       className="text-3xl font-bold text-gray-800"
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//     >
//       Why Inkspire?
//     </motion.h2>
//     <p className="text-gray-500 mt-2">
//       Everything a modern writer needs in one place.
//     </p>
//     <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
//       {features.map((f, i) => (
//         <motion.div
//           key={i}
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: i * 0.2 }}
//           className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6 shadow-md hover:shadow-lg transition"
//         >
//           <div className="w-12 h-12 flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-full mb-4">
//             {f.icon}
//           </div>
//           <h3 className="text-lg font-semibold">{f.title}</h3>
//           <p className="text-sm text-gray-600 mt-2">{f.desc}</p>
//         </motion.div>
//       ))}
//     </div>
//   </div>
// </section>


//       {/* Categories */}
// <section className="py-20 bg-indigo-100 px-4">
//   <div className="max-w-5xl mx-auto text-center">
//     <motion.h2
//       className="text-3xl font-bold text-gray-800"
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//     >
//       Popular Blog Categories
//     </motion.h2>
//     <p className="text-gray-600 mt-2">Explore topics readers love most</p>
//     <div className="flex flex-wrap justify-center gap-4 mt-10">
//       {categories.map((cat, i) => (
//         <motion.div
//           key={i}
//           className="px-5 py-2 bg-white rounded-full border border-indigo-200 text-indigo-700 font-medium hover:bg-indigo-600 hover:text-white transition shadow-sm"
//           initial={{ scale: 0.9, opacity: 0 }}
//           whileInView={{ scale: 1, opacity: 1 }}
//           transition={{ delay: i * 0.1 }}
//         >
//           {cat}
//         </motion.div>
//       ))}
//     </div>
//   </div>
// </section>


// {/* How It Works */}
// <section className="bg-white py-20 px-4">
//   <div className="max-w-6xl mx-auto text-center">
//     <motion.h2
//       className="text-3xl font-bold text-gray-800"
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//     >
//       How It Works
//     </motion.h2>
//     <p className="text-gray-500 mt-2">
//       Just a few steps to start your blogging journey
//     </p>

//     <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12">
//       {[
//         {
//           step: "1",
//           title: "Sign Up",
//           desc: "Create your free Inkspire account with just an email.",
//         },
//         {
//           step: "2",
//           title: "Write Blogs",
//           desc: "Use our beautiful editor to craft your posts with images, code, and formatting.",
//         },
//         {
//           step: "3",
//           title: "Publish",
//           desc: "Hit publish and your post goes live instantly for the world to read.",
//         },
//         {
//           step: "4",
//           title: "Engage",
//           desc: "Receive feedback from readers through likes and comments.",
//         },
//       ].map((item, i) => (
//         <motion.div
//           key={i}
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: i * 0.2 }}
//           className="bg-white border border-indigo-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:scale-[1.02]"
//         >
//           <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg mx-auto shadow">
//             {item.step}
//           </div>
//           <h3 className="text-lg font-semibold mt-4 text-indigo-700">{item.title}</h3>
//           <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
//         </motion.div>
//       ))}
//     </div>
//   </div>
// </section>

//       {/* CTA */}
// <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-20 px-4 text-center relative overflow-hidden">
//   <motion.div
//     initial={{ opacity: 0, scale: 0.95 }}
//     whileInView={{ opacity: 1, scale: 1 }}
//     transition={{ duration: 0.4 }}
//   >
//     <h2 className="text-4xl font-bold">Start your blog in minutes</h2>
//     <p className="mt-4 text-lg max-w-xl mx-auto">
//       Join thousands of writers already using <span className="font-bold">Inkspire</span>
//     </p>
//     <Link
//       to="/register"
//       className="mt-8 inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition shadow-lg"
//     >
//       Join Now
//     </Link>
//   </motion.div>
// </section>

//     </div>
//   );
// };

// export default Landing;


import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
  "Writing Tip",
];

const Landing = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (cat) => {
    navigate(`/tag/${cat}`);
  };

  return (
    <div className="text-gray-800">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-100 py-24 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="text-center lg:text-left flex-1">
            <motion.h1
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-5xl sm:text-6xl font-extrabold text-indigo-700 leading-tight"
            >
              Welcome to <span className="text-purple-600">Inkspire ✍️</span>
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-gray-700 max-w-xl mx-auto lg:mx-0"
            >
              Share your thoughts, inspire others, and grow your writing journey — one post at a time.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition shadow"
              >
                Log In
              </Link>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <img
              src="/Blogging.png"
              alt="Blog illustration"
              className="w-full max-w-md mx-auto drop-shadow-xl"
            />
          </motion.div>
        </div>
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
          <p className="text-gray-500 mt-2">
            Everything a modern writer needs in one place.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6 shadow-md hover:shadow-lg transition"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-full mb-4">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
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
          <p className="text-gray-600 mt-2">Explore topics readers love most</p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {categories.map((cat, i) => (
              <motion.button
                key={i}
                onClick={() => handleCategoryClick(cat)}
                className="px-5 py-2 bg-white rounded-full border border-indigo-200 text-indigo-700 font-medium hover:bg-indigo-600 hover:text-white transition shadow-sm"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
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
          <p className="text-gray-500 mt-2">
            Just a few steps to start your blogging journey
          </p>

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
                className="bg-white border border-indigo-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:scale-[1.02]"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg mx-auto shadow">
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
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-20 px-4 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-4xl font-bold">Start your blog in minutes</h2>
          <p className="mt-4 text-lg max-w-xl mx-auto">
            Join thousands of writers already using <span className="font-bold">Inkspire</span>
          </p>
          <Link
            to="/register"
            className="mt-8 inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition shadow-lg"
          >
            Join Now
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Landing;
