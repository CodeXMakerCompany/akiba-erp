import { NextFunction, Request, Response } from "express";
import Template from "../../models/template";

export const getByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.params;

  try {
    const template = await Template.findOne({ name });

    if (!template) {
      return res.status(412).send({
        status: "error",
        model: "Template",
        error: "template not found",
      });
    }
    return res.status(200).send({
      status: "success",
      model: "Template",
      template: template,
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
