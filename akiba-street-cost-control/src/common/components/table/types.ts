export interface InterfaceHeader {
  label: string;
  value: string;
  align: "center" | "left" | "right" | "justify" | "inherit" | undefined;
}

export const categoryAttributes = ["id", "name", "created_at"];

export const salesAttributes = [
  "id",
  "category",
  "customer_email",
  "sale_date",
  "total_value",
  "tracking_guide",
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
