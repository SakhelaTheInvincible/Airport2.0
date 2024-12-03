"use client";

import { useState, useEffect } from "react";
import "../../globals.css";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface Ticket {
  id: number;
  date: string;
  class: string;
  price: number;
}

interface Airport {
  id: number;
  name: string;
}

const SearchResults = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [sourceAirport, setSourceAirport] = useState<Airport | null>(null);
  const [destinationAirport, setDestinationAirport] = useState<Airport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Extract query parameters
  const searchParams = new URLSearchParams(window.location.search);
  const source = searchParams.get("source");
  const destination = searchParams.get("destination");
  const date = searchParams.get("date");

  useEffect(() => {
    if (!source || !destination) {
      setError("Missing required search parameters: Source or Destination.");
      setLoading(false);
      return;
    }

    const fetchTickets = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/tickets/search?source_airport_id=${source}&destination_airport_id=${destination}&date=${date || ""}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch tickets: ${response.status}`);
        }

        const data = await response.json();

        // Extract data for tickets and airports
        setTickets(Array.isArray(data.tickets?.data) ? data.tickets.data : []);
        setSourceAirport(data.sourceAirport || null);
        setDestinationAirport(data.destinationAirport || null);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setError("Failed to load tickets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [source, destination, date]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
        <p className="text-lg font-medium">Loading tickets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
        <p className="text-red-500 text-lg font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-6 bg-gray-50 dark:bg-gray-900 dark:text-gray-200">
      <h1 className="text-3xl font-extrabold mb-6 text-center">Search Results</h1>
      {sourceAirport && destinationAirport && (
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 text-center">
          Showing results from{" "}
          <strong className="text-blue-500 dark:text-blue-400">{sourceAirport.name}</strong> to{" "}
          <strong className="text-blue-500 dark:text-blue-400">{destinationAirport.name}</strong>.
        </p>
      )}
      {tickets.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">
          No tickets found for the selected criteria.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                {["Date", "Class", "Price"].map((header) => (
                  <th
                    key={header}
                    className="py-3 px-5 text-left font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wide"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                >
                  <td className="py-3 px-5 border-b border-gray-200 dark:border-gray-700">
                    {new Date(ticket.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-5 border-b border-gray-200 dark:border-gray-700">
                    {ticket.class}
                  </td>
                  <td className="py-3 px-5 border-b border-gray-200 dark:border-gray-700">
                    ${ticket.price}
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

export default SearchResults;
