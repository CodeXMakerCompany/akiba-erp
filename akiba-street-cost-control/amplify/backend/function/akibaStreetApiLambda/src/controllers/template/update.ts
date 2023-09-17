import { NextFunction, Request, Response } from "express";
import Template from "../../models/template";

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id, ...args } = req.body;

  try {
    await Template.updateOne({ _id }, { ...args });

    const foundTemplate = await Template.findById({ _id });
    return res.status(200).send({
      status: "success",
      model: "Template",
      template: foundTemplate,
    });
  } catch (error) {
    console.log(error);

    return res.status(412).send({
      status: "error",
      model: "Template",
      error: error,
    });
  }
};
