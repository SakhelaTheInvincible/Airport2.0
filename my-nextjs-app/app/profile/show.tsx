import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Ticket {
  sourceAirport: { name: string };
  destinationAirport: { name: string };
  date: string;
  class: string;
  pivot: {
    quantity: number;
  };
  price: number;
}

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

interface ProfilePageProps {
  user: User;
  tickets: Ticket[];
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchProfileData = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setTickets(data.tickets);
      } else {
        router.push('/login');
      }
    };

    fetchProfileData();
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Your Profile</h1>

      <div>
        <p><strong>First Name:</strong> {user.first_name}</p>
        <p><strong>Last Name:</strong> {user.last_name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <a href="/profile/edit" className="btn btn-secondary mt-3">Edit Profile</a>

      <h2 className="mt-5">Your Tickets</h2>

      {tickets.length === 0 ? (
        <p>You have not purchased any tickets yet.</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Source</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Class</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={index}>
                <td>{ticket.sourceAirport.name}</td>
                <td>{ticket.destinationAirport.name}</td>
                <td>{new Date(ticket.date).toLocaleDateString('en-GB')}</td> {/* Format date */}
                <td>{ticket.class}</td>
                <td>{ticket.pivot.quantity}</td>
                <td>{ticket.price * ticket.pivot.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProfilePage;
