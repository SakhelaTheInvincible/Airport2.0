// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// interface Airport {
//   id: number;
//   name: string;
// }

// const Search = () => {
//   const [airports, setAirports] = useState<Airport[]>([]);
//   const [source, setSource] = useState<string>("");
//   const [destination, setDestination] = useState<string>("");
//   const [date, setDate] = useState<string>("");
//   const router = useRouter();

//   useEffect(() => {
//     const fetchAirports = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/api/homepage`);
//         const data = await response.json();
//         setAirports(data);
//       } catch (error) {
//         console.error("Error fetching airports:", error);
//       }
//     };

//     fetchAirports();
//   }, []);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!source || !destination) {
//       alert("Please select both source and destination.");
//       return;
//     }
//     router.push(`/tickets/searchResults?source=${source}&destination=${destination}&date=${date}`);
//   };

//   return (
//     <div className="container">
//       <h1>Search Tickets</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="source">Source</label>
//           <select
//             id="source"
//             onChange={(e) => setSource(e.target.value)}
//             value={source}
//             required
//           >
//             <option value="">Select Source</option>
//             {airports.map((airport) => (
//               <option key={airport.id} value={airport.id}>
//                 {airport.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label htmlFor="destination">Destination</label>
//           <select
//             id="destination"
//             onChange={(e) => setDestination(e.target.value)}
//             value={destination}
//             required
//           >
//             <option value="">Select Destination</option>
//             {airports.map((airport) => (
//               <option key={airport.id} value={airport.id}>
//                 {airport.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label htmlFor="date">Date</label>
//           <input
//             type="date"
//             id="date"
//             onChange={(e) => setDate(e.target.value)}
//             value={date}
//           />
//         </div>

//         <button type="submit">Find Tickets</button>
//       </form>
//     </div>
//   );
// };

// export default Search;
