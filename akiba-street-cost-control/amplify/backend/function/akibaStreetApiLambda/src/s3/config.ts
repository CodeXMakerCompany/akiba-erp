import * as dotenv from "dotenv";
import "dotenv/config";
dotenv.config();
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const accessKeyId: string = process.env.AWSACCESSKEYID as string;
const secretAccessKey: string = process.env.AWSSECRETACCESSKEY as string;
const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
const Bucket = process.env.BUCKET;

export const uploadToS3 = async ({ file }: any) => {
  const command = new PutObjectCommand({
    Bucket,
    Key: file.originalname,
    ACL: "public-read",
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  try {
    await s3.send(command);

    return { key: file.originalname };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const getS3ObjectSigned = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET,
    Key: key,
  });

  try {
    const image = await getSignedUrl(s3, command, { expiresIn: 900 });
    console.log(image);

    return image;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const getPublicS3Object = async (key: string) =>
  `${process.env.AWSBUCKETFULLNAME}/${key}`;
