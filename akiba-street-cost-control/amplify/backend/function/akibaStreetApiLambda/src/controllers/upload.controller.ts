import { GetObjectCommand } from "@aws-sdk/client-s3";
import { NextFunction, Request, Response } from "express";
import { getPublicS3Object, uploadToS3 } from "../s3/config";

const uploadData = async (req: Request, res: Response, next: NextFunction) => {
  const { file } = req;

  try {
    const { error, key } = await uploadToS3({ file });
    if (key) {
      const image = await getPublicS3Object(key);
      return res.status(200).send({
        status: "success",
        model: "Upload succesfully",
        image,
      });
    }
    console.log(error);
  } catch (warn) {
    return res.status(412).send({
      status: "error",
      model: "Upload error",
      error: warn,
    });
  }
};

export default { uploadData };
