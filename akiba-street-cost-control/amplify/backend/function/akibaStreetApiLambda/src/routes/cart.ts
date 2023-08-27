import * as express from "express";
import CartController from "../controllers/cart.controller";

const router = express.Router();

router.get("/:userId", CartController.getUserCart);
router.post("/add", CartController.addItemToCart);
router.put("/:userId/:productId/:quantity", CartController.updateItemInCart);
router.delete("/:userId", CartController.cleanCart);

export default router;
