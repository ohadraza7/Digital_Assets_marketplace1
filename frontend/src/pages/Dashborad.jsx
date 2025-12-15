// import React from "react";
// import useAuth from "../hooks/useAuth";

// export default function Dashboard() {
//   const { user } = useAuth();

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="card">
//         <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
//         <p className="text-sm text-gray-600">
//           Welcome back, <strong>{user?.name || user?.email}</strong>
//         </p>

//         <div>
//           <p>
//             <strong>Role:</strong> {user?.role}
//           </p>
//           <p>
//             <strong>User ID:</strong> {user?._id || user?.id || "—"}
//           </p>

//           <p className="mt-3 text-sm text-gray-700">
//             This is a protected page. You can implement creator/buyer dashboards
//             here.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
