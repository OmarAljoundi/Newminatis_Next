import { useAppSelector } from "@/hooks/useRedux";

function createData(LOCATION: string, DELIVERY_TIME: string, COST: string) {
  return { LOCATION, DELIVERY_TIME, COST };
}

export const ShippingInfo = () => {
  const SI = useAppSelector((x) => x.Store.ContentReducer?.Content);
  const rows = [
    createData("Dubai, Sharjah", "SAME DAY", "FREE"),
    createData("GCC and Middle East", "3-5 Business Days ", "FREE Above $300"),
    createData("All other regions", "4-7 Business Days ", "FREE Above $300"),
  ];
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
          <tr>
            <th scope="col" className="px-2 py-3 text-xs">
              LOCATION
            </th>
            <th scope="col" className="px-2 py-3 text-xs">
              DELIVERY TIME
            </th>
            <th scope="col" className="px-2 py-3 text-xs">
              COST
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white text-xs"
              >
                {row.LOCATION}
              </th>
              <td className="px-2 py-1 text-xs">{row.DELIVERY_TIME}</td>
              <td className="px-2 py-1 text-xs">{row.COST}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
