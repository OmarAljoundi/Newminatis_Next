export type TShoppingSession = {
  id: number;
  userId: number;
  total: number;
  voucher: string | null;
  voucherType: string | null;
  discount: number;
  totalDiscount?: number | null;
  checkedout: boolean;
  countryCode?: string | null;
  weight?: number | null;
  shippingCost?: number | null;
  taxAmount?: number | null;
  dutyAmount?: number | null;
  taxRate?: number | null;
  subTotal: number;
  expired: Date;
  createdDate?: Date | null;
};
