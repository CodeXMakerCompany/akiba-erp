export const CategoriesModal = "Categories"
export const SalesModal = "Sales" 
export const ProductsModal = "Product"
export const CalendarsModal = "Calendar"
export const AuctionsModal = "Auctions"

export type ModalType = "Categories" | "Sales" | "Product" | "Calendar" | "Auctions"

export interface ModalProps {
  type: ModalType;
  mode: string;
  isOpen: boolean;
}