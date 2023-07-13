export type TShoppingSession = {
  id: number;
  userId: number;
  total: number;
  voucher: string | null;
  voucherType: string | null;
  discount: number;
  checkedout: boolean;
  countryCode?: string | null;
  weight?: number | null;
  shippingCost?: number | null;
  taxAmount?: number | null;
  expired: Date;
  createdDate: Date | null;
};
