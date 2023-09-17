import { NextFunction, Request, Response } from "express";
import Template from "../../models/template";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  try {
    const createdTemplate = await Template.create({ name });

    return res.status(200).send({
      status: "success",
      model: "Template",
      template: createdTemplate,
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
