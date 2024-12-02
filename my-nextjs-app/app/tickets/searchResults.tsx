import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Ticket {
  id: number;
  date: string;
  class: string;
  price: number;
  sourceAirport: { name: string };
  destinationAirport: { name: string };
  pivot: {
    quantity: number;
  };
}

interface SearchResultsProps {
  tickets: Ticket[];
}

const SearchResults = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [remainingQuantities, setRemainingQuantities] = useState<Record<number, number>>({});
  const [selectedQuantities, setSelectedQuantities] = useState<Record<number, number>>({});
  const { query } = useRouter();
  const { source, destination, date } = query;

  useEffect(() => {
    if (source && destination && date) {
      fetch(`http://127.0.0.1:8000/api/tickets?source=${source}&destination=${destination}&date=${date}`)
        .then((response) => response.json())
        .then((data) => {
          setTickets(data);
          const quantities: Record<number, number> = {};
          data.forEach((ticket: Ticket) => {
            quantities[ticket.id] = 3;
          });
          setRemainingQuantities(quantities);
        });
    }
  }, [source, destination, date]);

  const handleQuantityChange = (ticketId: number, value: number) => {
    if (value <= 3 && value >= 1) {
      setSelectedQuantities((prev) => ({
        ...prev,
        [ticketId]: value,
      }));
    }
  };

  const handlePurchase = (ticketId: number) => {
    const quantity = selectedQuantities[ticketId] || 1;
    if (quantity <= remainingQuantities[ticketId]) {
      fetch('/api/tickets/purchase', {
        method: 'POST',
        body: JSON.stringify({ ticketId, quantity }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((data) => {
          alert('Purchase successful!');
        });
    } else {
      alert('You cannot buy more than 3 tickets.');
    }
  };

  return (
    <div className="container">
      <h1>Search Results</h1>
      {tickets.length === 0 ? (
        <p>Sorry, No Tickets Found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Class</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Purchase</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{new Date(ticket.date).toLocaleDateString()}</td>
                <td>{ticket.class}</td>
                <td>{ticket.price}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    max={remainingQuantities[ticket.id]}
                    value={selectedQuantities[ticket.id] || 1}
                    onChange={(e) => handleQuantityChange(ticket.id, parseInt(e.target.value))}
                  />
                </td>
                <td>
                  <button onClick={() => handlePurchase(ticket.id)}>Purchase</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchResults;
