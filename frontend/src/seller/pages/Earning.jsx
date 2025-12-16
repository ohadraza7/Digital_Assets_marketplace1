export default function Earning() {
  const earnings = [
    { month: "September", amount: "$120" },
    { month: "October", amount: "$300" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Earnings</h1>

      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="pb-3">Month</th>
              <th className="pb-3">Earnings</th>
            </tr>
          </thead>
          <tbody>
            {earnings.map((item, i) => (
              <tr key={i} className="border-t">
                <td className="py-3">{item.month}</td>
                <td className="py-3 font-semibold">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 text-gray-600 text-sm">
          Payouts are processed monthly after verification.
        </div>
      </div>
    </div>
  );
}
