import { NextFunction, Request, Response } from "express";
import Sale from "../models/sale";
import Card from "../models/card";
import Cart from "../models/cart";
import Product from "../models/product";
import { EmailService } from "../services";
import { SENDER_EMAIL } from "../services/email/constants";

const createSale = async (req: Request, res: Response, next: NextFunction) => {
  const { products, total, customer_id, ...args } = req.body;

  const productInvestment = products.reduce(
    (accumulator: number, object: any) => {
      return (
        accumulator +
        (object.our_purchase_price
          ? object.our_purchase_price
          : parseFloat(object.customerPrice) * 0.4) *
          object.qty
      );
    },
    0
  );

  const realTotal = total - productInvestment;

  try {
    await Card.bulkWrite(
      products.map((card) => ({
        updateOne: {
          filter: { _id: card.id },
          update: { $inc: { stock: -card.quantity, sold: +card.quantity } },
          upsert: false,
        },
      }))
    );
    await Product.bulkWrite(
      products.map((product) => ({
        updateOne: {
          filter: { _id: product.id },
          update: {
            $inc: { stock: -product.quantity, sold: +product.quantity },
          },
          upsert: false,
        },
      }))
    );

    const newSale = await Sale.create({
      products,
      total,
      net_earning: isNaN(realTotal) ? 0 : realTotal,
      customer_id: customer_id,
      ...args,
    });

    const emailProducts = products.map((product) => {
      const productsPrice =
        parseFloat(product?.customerPrice) * product.quantity;
      return {
        text: product?.name,
        image: product?.image,
        price: productsPrice?.toString(),
        quantity: product?.quantity?.toString(),
      };
    });

    await EmailService.newOrderEmail({
      amount: total,
      currency: args.payment_currency,
      email: args.customer,
      orderId: newSale._id,
      products: emailProducts,
    });

    await EmailService.newOrderEmail({
      amount: total,
      currency: args.payment_currency,
      email: SENDER_EMAIL,
      orderId: newSale._id,
      products: emailProducts,
    });

    //Sent email notification
    //clean cart
    const activeCart = await Cart.findOne({ userId: customer_id });

    if (activeCart) {
      let products = [];

      await Cart.updateOne(
        { userId: customer_id },
        {
          products,
        }
      );
    }
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
    userId,
    page,
    limit,
    startDate,
    endDate,
  }: {
    userId?: string;
    page: string;
    limit: string;
    startDate?: string;
    endDate?: string;
  } = req.body;

  const options = {
    page,
    limit,
    collation: {
      locale: "en",
    },
    sort: { created_at: -1 },
  };

  const results = await Sale.paginate({
    ...options,
    query: {
      customer_id: userId,
    },
  });

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
