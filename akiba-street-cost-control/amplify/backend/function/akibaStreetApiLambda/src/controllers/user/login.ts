import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import User from "../../models/user";
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  try {
    const foundUser: any = await User.findOne({ email: username });

    if (foundUser._id) {
      const user = { ...foundUser._doc };
      const token = jwt.sign(user, "AKIBASHOP", {
        expiresIn: 60 * 60 * 24,
      });
      // Check for social login
      if (password == null || password == undefined) {
        return res.status(200).send({
          status: "success",
          message: "Login correct",
          user,
          token,
        });
      }

      //Check for standar login
      const validatePassword = await bcrypt.compareSync(
        password,
        user.password
      );

      if (validatePassword) {
        return res.status(200).send({
          status: "success",
          message: "Login correct",
          user,
          token,
        });
      }

      return res.status(412).send({
        status: "error",
        model: "User",
        error: "User password doesn't match",
      });
    }

    return res.status(412).send({
      status: "error",
      model: "User",
      error: "User not found",
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
