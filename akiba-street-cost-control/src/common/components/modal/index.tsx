import { Box, Modal, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import SaleModal from "./saleModal";
import CategoryModal from "./categoryModal";
import ProductModal from "./productModal";
import CalendarModal from "./calendarModal";
import { updateModalStatus } from "../../../redux/slices/modal/modal.slice";
import { useDispatch } from "react-redux";
import { setActiveProduct } from "../../../redux/slices/products/products.slice";

interface ModalProps {
  type: string;
  mode: string;
  isOpen: boolean;
}

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
        {type === "Categories" ? <CategoryModal /> : null}
        {type === "Sales" ? <SaleModal /> : null}
        {type === "Product" ? <ProductModal /> : null}
        {type === "Calendar" ? <CalendarModal /> : null}
      </Box>
    </Modal>
  );
};

export default GlobalModal;
