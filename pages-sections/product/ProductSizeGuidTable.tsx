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
};
const ProductSizeGuidTable: FC<SizeGuidProp> = ({ productSizeGuide }) => {
  const getHeaders = () => {
    if (productSizeGuide.length > 0)
      return Object.keys(productSizeGuide[0]).filter((key) => {
        return productSizeGuide.some(
          (item) =>
            item[key] !== null &&
            !["id", "productId", "sortOrder"].includes(key)
        );
      });
    return [];
  };

  return (
    <Table className="sm:max-w-[425px] md:max-w-2xl">
      <TableHeader>
        <TableRow className="overflow-scroll">
          {getHeaders()?.map((i) => (
            <TableHead className="px-4 text-xs">
              {SizeColums.find((x) => x.value == i)?.key}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {productSizeGuide.map((size) => (
          <TableRow key={size.id}>
            {getHeaders()?.map((header) => (
              <TableCell key={header} className="font-medium">
                {size[header]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const SizeColums = [
  {
    key: "Size",
    value: "size",
  },
  {
    key: "Length",
    value: "length",
  },

  {
    key: "Chest",
    value: "chest",
  },
  {
    key: "Shoulder",
    value: "shoulder",
  },

  {
    key: "Sleeve Length",
    value: "sleeveLength",
  },
  {
    key: "Sleeve Opening",
    value: "sleeveOpening",
  },
  {
    key: "Waist",
    value: "waist",
  },
  {
    key: "Front Crotch",
    value: "frontCrotch",
  },
];

export default ProductSizeGuidTable;
