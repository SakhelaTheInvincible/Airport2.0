"use client";
import React, { useState, useEffect } from "react";
import "./globals.css";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface Airport {
  id: string;
  name: string;
}

const FindTickets: React.FC = () => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [sourceAirportId, setSourceAirportId] = useState<string>("");
  const [destinationAirportId, setDestinationAirportId] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/homepage`);
        const data = await response.json();
        setAirports(data);
      } catch (error) {
        console.error("Error fetching airports:", error);
      }
    };

    fetchAirports();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceAirportId || !destinationAirportId) {
      alert("Please select both source and destination airports.");
      return;
    }

    const queryParams = new URLSearchParams({
      source: sourceAirportId,
      destination: destinationAirportId,
      date: date || "",
    });

    window.location.href = `/tickets/searchResults?${queryParams.toString()}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-gray-100 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 dark:text-gray-200 mb-6">
          Find Flights
        </h1>
        <form onSubmit={handleSubmit}>
          {[
            {
              id: "source_airport_id",
              label: "Source Airport",
              value: sourceAirportId,
              options: airports,
              setValue: setSourceAirportId,
            },
            {
              id: "destination_airport_id",
              label: "Destination Airport",
              value: destinationAirportId,
              options: airports,
              setValue: setDestinationAirportId,
            },
          ].map((field) => (
            <div key={field.id} className="mb-4">
              <label
                htmlFor={field.id}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {field.label}
              </label>
              <select
                id={field.id}
                value={field.value}
                onChange={(e) => field.setValue(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Select {field.label}</option>
                {field.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Date (optional)
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Find Tickets
          </button>
        </form>
      </div>
    </div>
  );
};

export default FindTickets;
