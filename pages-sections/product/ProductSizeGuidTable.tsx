import { TProductSizeGuide } from "@/types/TProductSizeGuide";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FC } from "react";

type SizeGuidProp = {
  productSizeGuide: TProductSizeGuide[];
  productType: string;
};
const ProductSizeGuidTable: FC<SizeGuidProp> = ({
  productSizeGuide,
  productType,
}) => {
  return (
    <Table className="sm:max-w-[425px] md:max-w-2xl">
      <TableHeader>
        <TableRow className="overflow-scroll">
          {TShirtsColums.map((i) => (
            <TableHead className="px-4 text-xs">{i}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {productSizeGuide.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium ">{row.size}</TableCell>
            <TableCell>{row.length}</TableCell>
            <TableCell>{row.chest}</TableCell>
            <TableCell className="text-right">{row.shoulder}</TableCell>
            <TableCell className="font-medium">{row.sleeveLength}</TableCell>
            <TableCell>{row.sleeveOpening}</TableCell>
            <TableCell>{row.waist}</TableCell>
            <TableCell className="text-right">{row.frontCrotch}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    // <TableContainer>
    //   <Table sx={{ minWidth: 200 }} size="small" aria-label="customized table">
    //     <TableHead>
    //       <StyledTableRow>
    //         {TShirtsColums.map(
    //           (i) => (
    //             <StyledTableCell align="center" key={i}>
    //               {i}
    //             </StyledTableCell>
    //           )
    //         )}
    //       </StyledTableRow>
    //     </TableHead>
    //     <TableBody>
    //       {productSizeGuide.map((row) => (
    //         <StyledTableRow
    //           key={row.size}
    //           sx={{
    //             "&:last-child td, &:last-child th": {
    //               border: 0,
    //             },
    //           }}
    //         >
    //           <StyledTableCell align="center" component="th" scope="row">
    //             {row?.size}
    //           </StyledTableCell>
    //           <StyledTableCell align="center">{row?.length}</StyledTableCell>
    //           <StyledTableCell align="center">
    //             {row?.chest ?? row?.waist}
    //           </StyledTableCell>
    //           <StyledTableCell align="center">
    //             {row?.shoulder ?? row?.frontCrotch}
    //           </StyledTableCell>
    //           {productType == "tshirt" && (
    //             <>
    //               <StyledTableCell align="center">
    //                 {row.sleeveLength}
    //               </StyledTableCell>
    //               <StyledTableCell align="center">
    //                 {row.sleeveOpening}
    //               </StyledTableCell>
    //             </>
    //           )}
    //         </StyledTableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
};

const TShirtsColums = [
  "Size",
  "Length",
  "Chest",
  "Shoulder",
  "Sleeve Length",
  "Sleeve Opening",
  "Waist",
  "Front Crotch",
];
const PantsColums = ["Size", "Length", "Waist", "Front Crotch"];

export default ProductSizeGuidTable;
