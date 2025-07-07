import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/auth/forgot-password/check", { email });
      setStep(2);
    } catch (err) {
      setError("Email not found");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      await axiosInstance.post("/auth/forgot-password/reset", { email, newPassword, confirmPassword });
      alert("✅ Password updated. Please login.");
      navigate("/login");
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-indigo-600 text-center">
          {step === 1 ? "Forgot Password" : "Reset Your Password"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        {step === 1 ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <input
              type="email"
              className="w-full p-3 border rounded"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              Verify Email
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <input
              type="password"
              className="w-full p-3 border rounded"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="w-full p-3 border rounded"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
