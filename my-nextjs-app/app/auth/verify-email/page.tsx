"use client";

import { useState } from "react";
import "../../globals.css";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function VerifyEmail() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleResendVerification = async () => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        `${BASE_URL}/api/auth/email/verification-notification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token from localStorage
          },
        }
      );

      if (response.ok) {
        setSuccessMessage("Verification email sent successfully.");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to resend email.");
      }
    } catch (error) {
      console.error("Verification resend failed:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Verify Your Email Address
        </h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-sm mb-4">{successMessage}</p>
        )}
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Before proceeding, check your email for a verification link.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          If you did not receive the email, you can request another one below.
        </p>
        <button
          onClick={handleResendVerification}
          disabled={loading}
          className={`w-full py-3 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Sending..." : "Resend Verification Email"}
        </button>
      </div>
    </div>
  );
}
