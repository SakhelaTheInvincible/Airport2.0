import { GetServerSideProps } from 'next';

interface Ticket {
  sourceAirport: { name: string };
  destinationAirport: { name: string };
  date: string;
  class: string;
  total_price: number;
  pivot: {
    quantity: number;
    updated_at: string;
  };
}

interface User {
  email: string;
  tickets: Ticket[];
}

interface TicketsPageProps {
  users: User[];
}

const TicketsPage = ({ users }: TicketsPageProps) => {
  return (
    <div className="container">
      <h1>Admin - All Purchased Tickets</h1>

      {users.length === 0 ? (
        <p>No users have purchased tickets yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>User Email</th>
              <th>Source Airport</th>
              <th>Destination Airport</th>
              <th>Date</th>
              <th>Class</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Last Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) =>
              user.tickets.map((ticket, index) => (
                <tr key={index}>
                  <td>{user.email}</td>
                  <td>{ticket.sourceAirport.name}</td>
                  <td>{ticket.destinationAirport.name}</td>
                  <td>{ticket.date}</td>
                  <td>{ticket.class}</td>
                  <td>{ticket.pivot.quantity}</td>
                  <td>{ticket.total_price}</td>
                  <td>{ticket.pivot.updated_at}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch('http://127.0.0.1:8000/api/admin/tickets');
  const users = await response.json();

  return {
    props: {
      users,
    },
  };
};

export default TicketsPage;
