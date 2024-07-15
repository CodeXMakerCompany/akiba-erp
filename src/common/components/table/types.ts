export interface InterfaceHeader {
  label: string;
  value: string;
  align: "center" | "left" | "right" | "justify" | "inherit" | undefined;
}

export const categoryAttributes = ["id", "name", "created_at"];

export const salesAttributes = [
  "customer",
  "payment_method",
  "total",
  "net_earning",
  "created_at",
];

export const productAttributes = [
  "image",
  "name",
  "customerPrice",
  "purchasePrice",
  "stock",
  "category",
  "createdAt",
];

export const auctionAttributes = [
  "name",
  "createdAt",
];
