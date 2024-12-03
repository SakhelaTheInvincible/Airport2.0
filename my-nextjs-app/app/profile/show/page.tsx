"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../../globals.css";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface Ticket {
  sourceAirport: { name: string };
  destinationAirport: { name: string };
  date: string;
  class: string;
  pivot: { quantity: number };
  price: number;
}

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setTickets(data.tickets);
        } else {
          router.push("/auth/login");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [router]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-6 bg-gray-50 dark:bg-gray-900 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>First Name:</strong> {user.first_name}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Last Name:</strong> {user.last_name}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Email:</strong> {user.email}
        </p>
        <a
          href="/profile/edit"
          className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Edit Profile
        </a>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Your Tickets</h2>
      {tickets.length === 0 ? (
        <p className="text-center text-gray-500">You have not purchased any tickets yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                {["Source", "Destination", "Date", "Class", "Quantity", "Total Price"].map(
                  (header) => (
                    <th
                      key={header}
                      className="py-3 px-5 text-left font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wide"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                >
                  <td className="py-3 px-5 border-b border-gray-200 dark:border-gray-700">
                    {ticket.sourceAirport.name}
                  </td>
                  <td className="py-3 px-5 border-b border-gray-200 dark:border-gray-700">
                    {ticket.destinationAirport.name}
                  </td>
                  <td className="py-3 px-5 border-b border-gray-200 dark:border-gray-700">
                    {new Date(ticket.date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="py-3 px-5 border-b border-gray-200 dark:border-gray-700">
                    {ticket.class}
                  </td>
                  <td className="py-3 px-5 border-b border-gray-200 dark:border-gray-700">
                    {ticket.pivot.quantity}
                  </td>
                  <td className="py-3 px-5 border-b border-gray-200 dark:border-gray-700">
                    ${(ticket.price * ticket.pivot.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
