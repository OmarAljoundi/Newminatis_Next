import {
  Box,
  Card,
  Container,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Paragraph } from "../Typography";
import { useAppSelector } from "@/hooks/useRedux";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.marron.main,
    color: theme.palette.common.black,
    [(theme.breakpoints.not("sm"), theme.breakpoints.not("xs"))]: {
      fontSize: 12,
    },
    fontSize: 8,
    padding: "0px 2px",
    textAlign: "center",
    width: "33%",
  },
  [`&.${tableCellClasses.body}`]: {
    [(theme.breakpoints.not("sm"), theme.breakpoints.not("xs"))]: {
      fontSize: 12,
    },
    fontSize: 9,
    padding: "4px 6px",
    textAlign: "center",
    width: "33%",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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
