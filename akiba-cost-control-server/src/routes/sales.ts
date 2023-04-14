import express from "express";
import SaleController from "../controllers/sale.controller";
const router = express.Router();

router.get("/all", SaleController.getSales);

export default router;
