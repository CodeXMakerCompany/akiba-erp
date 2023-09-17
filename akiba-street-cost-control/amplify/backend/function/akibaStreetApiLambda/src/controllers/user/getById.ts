import { NextFunction, Request, Response } from "express";
import User from "../../models/user";
import mongoose from "mongoose";
export const getbyId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id }: any = req.params;
  const parsedId = new mongoose.Types.ObjectId(id.substring(id.length - 12));
  const params = req.body;

  try {
    const foundUser = await User.findById(
      new mongoose.Types.ObjectId(parsedId)
    );

    if (!foundUser) {
      //Create a new one since we received it from our session provider

      const createdUser = await User.create({
        _id: parsedId,
        ...params,
      });

      return res.status(200).send({
        status: "error",
        model: "User",
        message: "User  found",
        user: createdUser,
      });
    }

    return res.status(200).send({
      status: "error",
      model: "User",
      message: "User  found",
      user: foundUser,
    });
  } catch (error) {
    console.log(error);

    return res.status(412).send({
      status: "error",
      model: "User",
      error: error,
    });
  }
};
