import { GetServerSideProps } from "next";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Admin - All Purchased Tickets
      </h1>
      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users have purchased tickets yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg border border-gray-200">
            <thead>
              <tr className="bg-gray-50 text-gray-800">
                {[
                  "User Email",
                  "Source Airport",
                  "Destination Airport",
                  "Date",
                  "Class",
                  "Quantity",
                  "Total Price",
                  "Last Purchase Date",
                ].map((header) => (
                  <th
                    key={header}
                    className="py-3 px-5 text-left font-semibold text-sm uppercase tracking-wider border-b"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) =>
                user.tickets.map((ticket, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition-colors duration-150"
                  >
                    <td className="py-3 px-5 border-b text-gray-700 text-sm">
                      {user.email}
                    </td>
                    <td className="py-3 px-5 border-b text-gray-700 text-sm">
                      {ticket.sourceAirport.name}
                    </td>
                    <td className="py-3 px-5 border-b text-gray-700 text-sm">
                      {ticket.destinationAirport.name}
                    </td>
                    <td className="py-3 px-5 border-b text-gray-700 text-sm">
                      {new Date(ticket.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-5 border-b text-gray-700 text-sm">
                      {ticket.class}
                    </td>
                    <td className="py-3 px-5 border-b text-gray-700 text-sm">
                      {ticket.pivot.quantity}
                    </td>
                    <td className="py-3 px-5 border-b text-gray-700 text-sm">
                      ${ticket.total_price.toFixed(2)}
                    </td>
                    <td className="py-3 px-5 border-b text-gray-700 text-sm">
                      {new Date(ticket.pivot.updated_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${BASE_URL}/api/admin/tickets`);
  const users = await response.json();

  return {
    props: {
      users,
    },
  };
};

export default TicketsPage;
