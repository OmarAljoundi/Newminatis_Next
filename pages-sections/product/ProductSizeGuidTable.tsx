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
import { FC, useState } from "react";
import { Tab } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { Fade } from "@mui/material";

type SizeGuidProp = {
  productSizeGuide: TProductSizeGuide[];
};
const ProductSizeGuidTable: FC<SizeGuidProp> = ({ productSizeGuide }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
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

  const TableData = (factor: number) => {
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
                  {getSizeValue(factor, size[header])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div>
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex space-x-1  bg-blue-900/20 p-1">
          {["INCH", "CM"].map((unit) => (
            <Tab
              key={unit}
              className={({ selected }) =>
                cn(
                  "w-full  py-2.5 text-sm font-medium leading-5 text-black",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-600 focus:outline-none focus:ring-2 transition-all duration-300",
                  selected
                    ? "bg-white shadow"
                    : "text-gray-400 hover:bg-white/[0.40] hover:text-white"
                )
              }
            >
              {unit}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Fade in={selectedIndex == 0} exit={selectedIndex != 0}>
            <div>
              <Tab.Panel>{TableData(1)}</Tab.Panel>
            </div>
          </Fade>
          <Fade in={selectedIndex == 1} exit={selectedIndex != 1}>
            <div>
              <Tab.Panel>{TableData(2.54)}</Tab.Panel>
            </div>
          </Fade>
        </Tab.Panels>
      </Tab.Group>
    </div>
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
    key: "Armhole",
    value: "armhole",
  },
  {
    key: "Bottom",
    value: "bottom",
  },
  {
    key: "Front Crotch",
    value: "frontCrotch",
  },
];

const getSizeValue = (factor: number, value: any) => {
  if (factor == 1 || typeof value == "string") {
    return value;
  }
  return (value * factor).toFixed(2);
};

export default ProductSizeGuidTable;
