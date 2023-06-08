import { NextFunction, Request, Response } from "express";
import Sale from "../models/sale";

const createSale = async (req: Request, res: Response, next: NextFunction) => {
  const { products, total, paymentMethod, user } = req.body;

  const productInvestment = products.reduce(
    (accumulator: number, object: any) => {
      return accumulator + object.our_purchase_price * object.qty;
    },
    0
  );

  const realTotal = total - productInvestment;

  try {
    const newSale = await Sale.create({
      products,
      total,
      net_earning: realTotal,
      customer: user,
      payment_method: paymentMethod,
    });
    return res.status(200).send({
      status: "success",
      message: "Created Sale",
      createdItem: newSale,
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      message: "Error creating Sale",
      error: error,
    });
  }
};

const getSales = async (req: Request, res: Response, next: NextFunction) => {
  const {
    page,
    limit,
    startDate,
    endDate,
  }: { page: string; limit: string; startDate?: string; endDate?: string } =
    req.body;

  const options = {
    page,
    limit,
    collation: {
      locale: "en",
    },
    sort: { created_at: -1 },
  };

  const results = await Sale.paginate(options);

  try {
    return res.status(200).send({
      status: "success",
      model: "Sales",
      sales: results?.docs,
      totalDocs: results?.totalDocs,
      totalPages: results?.totalPages,
      page: results?.page,
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
