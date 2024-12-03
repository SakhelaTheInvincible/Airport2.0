"use client";

import { useState } from "react";
import "../../globals.css";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface Errors {
  [key: string]: string | undefined;
}

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful! Please log in.");
        window.location.href = "/auth/login"; // Redirect to login page
      } else {
        setErrors(data.errors || { general: data.message });
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
          Register
        </h1>
        {errors.general && (
          <div className="text-red-500 text-sm mb-4">{errors.general}</div>
        )}
        <form onSubmit={handleSubmit}>
          {[
            {
              id: "first_name",
              label: "First Name",
              value: firstName,
              setValue: setFirstName,
            },
            {
              id: "last_name",
              label: "Last Name",
              value: lastName,
              setValue: setLastName,
            },
            {
              id: "email",
              label: "Email",
              value: email,
              setValue: setEmail,
              type: "email",
            },
            {
              id: "password",
              label: "Password",
              value: password,
              setValue: setPassword,
              type: "password",
            },
            {
              id: "password_confirmation",
              label: "Confirm Password",
              value: passwordConfirmation,
              setValue: setPasswordConfirmation,
              type: "password",
            },
          ].map((field) => (
            <div key={field.id} className="mb-4">
              <label
                htmlFor={field.id}
                className="block text-gray-700 dark:text-gray-300 mb-2"
              >
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type || "text"}
                value={field.value}
                onChange={(e) => field.setValue(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-4 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
