import { TProductSubCategory } from "./TProductSubCategory";

export type TProductCategory = {
  id: number;
  name: string;
  description: string;
  createdDate: Date | null;
  modifiedDate: Date | null;
  productSubCategory: TProductSubCategory[];
};
