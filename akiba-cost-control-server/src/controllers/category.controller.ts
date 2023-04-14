import { NextFunction, Request, Response } from "express";
import Category from "../models/category";
const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = req.body;
  try {
    const newCategory = await Category.create(params);
    return res.status(200).send({
      status: "success",
      model: "Category",
      createdItem: newCategory,
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "Category",
      error: error,
    });
  }
};

const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find();
    return res.status(200).send({
      status: "success",
      model: "Category",
      categories,
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "Category",
      error: error,
    });
  }
};

export default { createCategory, getCategories };
