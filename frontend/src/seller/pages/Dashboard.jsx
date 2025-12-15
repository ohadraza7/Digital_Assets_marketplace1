export default function Dashboard() {
  const stats = [
    { title: "Total Assets", value: 24 },
    { title: "Approved Assets", value: 18 },
    { title: "Pending Approval", value: 6 },
    { title: "Total Earnings", value: "$420" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Seller Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-5 border">
            <p className="text-sm text-gray-500">{item.title}</p>
            <h2 className="text-2xl font-bold mt-2">{item.value}</h2>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-3">Platform Notice</h2>
        <p className="text-gray-600 text-sm">
          Uploaded assets are reviewed by admin before appearing in the
          marketplace. Ensure licensing and content originality.
        </p>
      </div>
    </div>
  );
}
