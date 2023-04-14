import { NextFunction, Request, Response } from "express";
import Sale from "../models/sale";

const createSale = async (req: Request, res: Response, next: NextFunction) => {
  const params = req.body;

  try {
    const newSale = await Sale.create(params);
    return res.status(200).send({
      status: "success",
      model: "Product",
      createdItem: newSale,
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "Product",
      error: error,
    });
  }
};

const getSales = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).send({
      status: "success",
      model: "Sales",
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "Category",
      error: error,
    });
  }
};

export default { getSales, createSale };
