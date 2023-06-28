import { TProductSizeGuide } from "@/types/TProductSizeGuide";
import {
  Paper,
  styled,
  Table,
  TableBody,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { FC } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    [(theme.breakpoints.not("sm"), theme.breakpoints.not("xs"))]: {
      fontSize: 20,
    },
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    [(theme.breakpoints.not("sm"), theme.breakpoints.not("xs"))]: {
      fontSize: 20,
    },
    fontSize: 14,
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

type SizeGuidProp = {
  productSizeGuide: TProductSizeGuide[];
  productType: string;
};
const ProductSizeGuidTable: FC<SizeGuidProp> = ({
  productSizeGuide,
  productType,
}) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 200 }} size="small" aria-label="customized table">
        <TableHead>
          <StyledTableRow>
            {(productType == "tshirt" ? TShirtsColums : PantsColums).map(
              (i) => (
                <StyledTableCell align="center" key={i}>
                  {i}
                </StyledTableCell>
              )
            )}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {productSizeGuide.map((row) => (
            <StyledTableRow
              key={row.size}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <StyledTableCell align="center" component="th" scope="row">
                {row?.size}
              </StyledTableCell>
              <StyledTableCell align="center">{row?.length}</StyledTableCell>
              <StyledTableCell align="center">
                {row?.chest ?? row?.waist}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row?.shoulder ?? row?.frontCrotch}
              </StyledTableCell>
              {productType == "tshirt" && (
                <>
                  <StyledTableCell align="center">
                    {row.sleeveLength}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.sleeveOpening}
                  </StyledTableCell>
                </>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const TShirtsColums = [
  "Size",
  "Length",
  "Chest",
  "Shoulder",
  "Sleeve Length",
  "Sleeve Opening",
];
const PantsColums = ["Size", "Length", "Waist", "Front Crotch"];

export default ProductSizeGuidTable;
