import * as express from "express";
import ProductController from "../controllers/product.controller";

const router = express.Router();

router.get("/all", ProductController.getProducts);
router.get("/get-by-id/:id", ProductController.getProductsById);
router.delete("/delete/:id", ProductController.removeProductById);
router.get("/search/:keyword", ProductController.getProductsByKeyword);
router.post("/create", ProductController.createProduct);
router.put("/update", ProductController.updateProduct);
router.post("/get-by-category", ProductController.getProductsByCategory);

export default router;
