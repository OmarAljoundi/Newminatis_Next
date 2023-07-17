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
    createData("GCC and Middle East", "3-5 Business Days ", "FREE"),
    createData("All other regions", "4-7 Business Days ", "FREE"),
  ];
  return (
    <div>
      <TableContainer>
        <Table
          sx={{ minWidth: 200 }}
          size="small"
          aria-label="customized table"
        >
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>LOCATION</StyledTableCell>
              <StyledTableCell align="left">DELIVERY TIME</StyledTableCell>
              <StyledTableCell align="left">COST</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.LOCATION}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <StyledTableCell align="left">{row.LOCATION}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.DELIVERY_TIME}
                </StyledTableCell>
                <StyledTableCell align="left">{row.COST}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {SI?.ourStory?.shippingInfoSingle && (
        <Box mt={2} textAlign={"left"}>
          <Paragraph
            fontWeight={"700"}
            dangerouslySetInnerHTML={{
              __html: SI?.ourStory?.shippingInfoSingle,
            }}
          ></Paragraph>
        </Box>
      )}
    </div>
  );
};
