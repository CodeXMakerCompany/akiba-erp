import { NextFunction, Request, Response } from "express";
import Cart from "../models/cart";

const getUserCart = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  try {
    let activeCart = await Cart.findOne({ userId });

    if (!activeCart) {
      activeCart = await Cart.create({ userId });
    }

    return res.status(200).send({
      status: "success",
      model: "Cart",
      cart: activeCart,
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "Cart",
      error: error,
    });
  }
};

const addItemToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { item, userId } = req.body;

  try {
    const activeCart = await Cart.findOne({ userId });

    if (activeCart) {
      let products = [...activeCart.products];

      const targetItem = products.filter(
        (product) => product.id === item._id
      )[0];

      if (!targetItem) {
        products.push({
          id: item._id,
          name: item.name,
          customerPrice: item.prices[0].sellPrice,
          image: item.image,
          quantity: 1,
        });
      } else {
        products = products.map((product) => {
          const quantity = parseInt(product.quantity);
          if (item._id === product.id) {
            return {
              ...product,
              quantity: quantity + 1,
            };
          }
          return product;
        });
      }

      await Cart.updateOne(
        { userId },
        {
          products,
        }
      );
    }

    const updatedCart = await Cart.findOne({ userId });

    return res.status(200).send({
      status: "success",
      model: "Cart",
      cart: updatedCart,
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "Cart",
      error: error,
    });
  }
};

const updateItemInCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId, userId, quantity } = req.params;

  try {
    const activeCart = await Cart.findOne({ userId });

    if (activeCart) {
      let products = [...activeCart.products];

      products = products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity,
          };
        }
        return product;
      });

      await Cart.updateOne(
        { userId },
        {
          products,
        }
      );
    }

    const updatedCart = await Cart.findOne({ userId });

    return res.status(200).send({
      status: "success",
      model: "Cart",
      cart: updatedCart,
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "Cart",
      error: error,
    });
  }
};

const cleanCart = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  try {
    const activeCart = await Cart.findOne({ userId });

    if (activeCart) {
      let products = [];

      await Cart.updateOne(
        { userId },
        {
          products,
        }
      );
    }

    const updatedCart = await Cart.findOne({ userId });

    return res.status(200).send({
      status: "success",
      model: "Cart",
      cart: updatedCart,
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "Cart",
      error: error,
    });
  }
};

export default { getUserCart, addItemToCart, updateItemInCart, cleanCart };
