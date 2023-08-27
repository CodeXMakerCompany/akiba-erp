import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import User from "../../models/user";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, rol } = req.body;

  try {
    const hashedPass = await bcrypt.hashSync(password, 10);

    const targetUser = await User.find({ email: email });

    if (targetUser.length) {
      return res.status(412).send({
        status: "error",
        message: "Email already registered in the system",
      });
    }

    const createdUser = await User.create({ email, password: hashedPass, rol });

    return res.status(200).send({
      status: "success",
      model: "User",
      user: createdUser,
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
