import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

const accessKeyId: string = process.env.AWSACCESSKEYID ?? "";
const secretAccessKey: string = process.env.AWSSECRETACCESSKEY ?? "";
const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
const Bucket = process.env.BUCKET;

export const uploadToS3 = async ({ file }: any) => {
  const key = uuidv4();
  const command = new PutObjectCommand({
    Bucket,
    Key: key,
    ACL: "public-read",
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  try {
    await s3.send(command);

    return { key };
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
