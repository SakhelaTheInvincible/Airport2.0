import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Airport {
  id: number;
  name: string;
}

const Search = () => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [source, setSource] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/homepage')
      .then((response) => response.json())
      .then((data) => setAirports(data));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/tickets/searchResults?source=${source}&destination=${destination}&date=${date}`);
  };

  return (
    <div className="container">
      <h1>Search Tickets</h1>
      <form onSubmit={handleSubmit}>
        <select name="source" onChange={(e) => setSource(e.target.value)} value={source}>
          <option value="">Select Source</option>
          {airports.map((airport) => (
            <option key={airport.id} value={airport.id}>
              {airport.name}
            </option>
          ))}
        </select>

        <select name="destination" onChange={(e) => setDestination(e.target.value)} value={destination}>
          <option value="">Select Destination</option>
          {airports.map((airport) => (
            <option key={airport.id} value={airport.id}>
              {airport.name}
            </option>
          ))}
        </select>

        <input type="date" name="date" onChange={(e) => setDate(e.target.value)} value={date} />

        <button type="submit">Find Tickets</button>
      </form>
    </div>
  );
};

export default Search;
