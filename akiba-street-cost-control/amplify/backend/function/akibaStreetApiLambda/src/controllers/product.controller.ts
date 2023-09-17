import { NextFunction, Request, Response } from "express";
import Category from "../models/category";
import Product from "../models/product";
import Card from "../models/card";

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
      model: "Product created",
      createdItem: newProduct,
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "Product error on create",
      error: error,
    });
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, _id, ...params } = req.body;

  try {
    await Product.findOneAndUpdate({ _id: id || _id }, params);
    return res.status(200).send({
      status: "success",
      model: "Product udpated",
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "Product",
      error: error,
    });
  }
};

const removeProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    await Product.deleteOne({ _id: id });
    return res.status(200).send({
      status: "success",
      message: "Product removed",
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      message: "Product couldn't be removed",
      error: error,
    });
  }
};

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find()
      .sort({ created_at: -1 })
      .populate("category");
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

const getProductsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id: _id } = req.params;
  try {
    const product = await Product.findOne({ _id });
    const card = await Card.findOne({ _id });
    return res.status(200).send({
      status: "success",
      model: "Product",
      card: card,
      product: product || card,
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "Product",
      error: error,
    });
  }
};

const getProductsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, size, category } = req.body;

    const targetCategory = await Category.findOne({
      name: { $regex: `^${category}$`, $options: "i" },
    });

    if (!targetCategory) {
      return res.status(412).send({
        status: "error",
        model: "Category not found",
      });
    }

    let options: any = {
      page: page,
      limit: size,
      sort: { _id: -1 },
    };
    const query = {
      category: targetCategory._id,
    };
    const products = await Product.paginate({ ...options, query });

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
    const singles = await Card.find({
      name: { $regex: keyWord, $options: "i" },
    });
    return res.status(200).send({
      status: "success",
      model: "Product",
      products,
      singles,
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "Product",
      error: error,
    });
  }
};

export default {
  createProduct,
  updateProduct,
  removeProductById,
  getProducts,
  getProductsById,
  getProductsByKeyword,
  getProductsByCategory,
};
