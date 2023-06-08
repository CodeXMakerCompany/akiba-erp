import * as express from "express";
import SaleController from "../controllers/sale.controller";
const router = express.Router();

router.post("/create", SaleController.createSale);
router.post("/all", SaleController.getSales);

export default router;
