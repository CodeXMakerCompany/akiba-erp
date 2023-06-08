import * as express from "express";
import CategoryController from "../controllers/category.controller";
import CategoryModel from "../models/category";

const router = express.Router();

router.get("/all", CategoryController.getCategories);
router.post("/create", CategoryController.createCategory);

export default router;
