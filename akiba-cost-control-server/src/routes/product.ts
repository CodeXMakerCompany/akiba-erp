import express from "express";
import ProductController from "../controllers/product.controller";

const router = express.Router();

router.get("/all", ProductController.getProducts);
router.get("/:keyword", ProductController.getProductsByKeyword);
router.post("/create", ProductController.createProduct);

export default router;
