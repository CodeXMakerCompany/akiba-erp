import { Box, Modal, Typography } from "@mui/material";
import CategoryModal from "./categoryModal";
import CalendarModal from "./calendarModal";
import SaleModal from "./saleModal";
import AuctionModal from "./auctionModal";
import ProductModal from "./productModal";
import { updateModalStatus } from "../../../redux/slices/modal/modal.slice";
import { useDispatch } from "react-redux";
import { setActiveProduct } from "../../../redux/slices/products/products.slice";


import { AuctionsModal, CategoriesModal, ModalProps, SalesModal, ProductsModal, CalendarsModal } from "./constants";




const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "45rem",
  overflow: "auto"
};

const GlobalModal = ({ type, mode, isOpen }: ModalProps) => {
  
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(updateModalStatus());
    dispatch(setActiveProduct(undefined));
  };
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {`${type} ${mode}`}
        </Typography>
        <hr />
        {type === CategoriesModal ? <CategoryModal /> : null}
        {type === SalesModal ? <SaleModal /> : null}
        {type === ProductsModal ? <ProductModal /> : null}
        {type === CalendarsModal ? <CalendarModal /> : null}
        {type === AuctionsModal ? <AuctionModal /> : null}
      </Box>
    </Modal>
  );
};

export default GlobalModal;
