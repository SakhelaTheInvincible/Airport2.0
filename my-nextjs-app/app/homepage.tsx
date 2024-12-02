'use client';

import React, { useState, useEffect } from 'react';

interface Airport {
  id: string;
  name: string;
}

const FindTickets: React.FC = () => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [sourceAirportId, setSourceAirportId] = useState<string>('');
  const [destinationAirportId, setDestinationAirportId] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/homepage');
        const data = await response.json();
        setAirports(data);
      } catch (error) {
        console.error('Error fetching airports:', error);
      }
    };

    fetchAirports();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search initiated with:', { sourceAirportId, destinationAirportId, date });
  };

  return (
    <div>
      <header>
        <h1>Find Flights</h1>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="source_airport_id">Source Airport:</label>
            <select
              name="source_airport_id"
              id="source_airport_id"
              required
              value={sourceAirportId}
              onChange={(e) => setSourceAirportId(e.target.value)}
            >
              <option value="">Select Source Airport</option>
              {airports.map((airport) => (
                <option key={airport.id} value={airport.id}>
                  {airport.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="destination_airport_id">Destination Airport:</label>
            <select
              name="destination_airport_id"
              id="destination_airport_id"
              required
              value={destinationAirportId}
              onChange={(e) => setDestinationAirportId(e.target.value)}
            >
              <option value="">Select Destination Airport</option>
              {airports.map((airport) => (
                <option key={airport.id} value={airport.id}>
                  {airport.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="date">Date (optional):</label>
            <input
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <button type="submit">Find Tickets</button>
          </div>
        </form>
      </main>

      <footer>
        <p>&copy; 2024 Your Company. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default FindTickets;
