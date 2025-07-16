import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import "react-quill/dist/quill.snow.css";

import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/authSlice";
import { useEffect } from "react";


// Pages
import Home from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import ViewPost from "./pages/ViewPost";
import Profile from "./pages/Profile";
import EditPost from "./pages/EditPost";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import TagPosts from "./pages/TagPosts";
import ForgotPassword from "./pages/ForgotPassword";
import SearchResults from "./pages/SearchResults";
import AdminDashboard from "./pages/AdminDashboard";
import UserList from "./pages/UserList";
import UserDetails from "./pages/UserDetails";
import PostList from "./pages/PostList";


// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

function AppContent() {
  
  const location = useLocation();
  const dispatch = useDispatch();

// Restore login state from localStorage
useEffect(() => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // we'll save this on login next

  if (token && user) {
    dispatch(loginSuccess(user));
  }
}, [dispatch]);

  // Hide navbar and footer on login and register pages (optional)
  const hideNavAndFooter = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {!hideNavAndFooter && <Navbar />}

      <div className={!hideNavAndFooter ? "pt-20" : ""}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:id" element={<ViewPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/tag/:tag" element={<TagPosts />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/search" element={<SearchResults />} />
<Route path="*" element={<p className="text-center mt-10 text-red-500">Page Not Found</p>} />


          {/* Protected Routes */}
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditPost  />
              </PrivateRoute>
            }
          />
         <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
>
  <Route path="users" element={<UserList />} />
  <Route path="users/:id" element={<UserDetails />} />
  <Route path="posts" element={<PostList />} />
</Route>
        </Routes>
      </div>

      {!hideNavAndFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
