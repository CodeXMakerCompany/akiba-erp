import { NextFunction, Request, Response } from "express";
import Product from "../models/product";

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = req.body;

  try {
    const newProduct = await Product.create(params);
    return res.status(200).send({
      status: "success",
      model: "Product",
      createdItem: newProduct,
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "Product",
      error: error,
    });
  }
};

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find();
    return res.status(200).send({
      status: "success",
      model: "Product",
      products,
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "Product",
      error: error,
    });
  }
};

const getProductsByKeyword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const keyWord = req.params.keyword;

  try {
    const products = await Product.find({
      name: { $regex: keyWord, $options: "i" },
    });
    return res.status(200).send({
      status: "success",
      model: "Product",
      products,
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "Product",
      error: error,
    });
  }
};

export default { createProduct, getProducts, getProductsByKeyword };
