import { Readable } from "stream";
import { bucket, s3 } from "../config";

export const retrieveS3StoredImage = async (imageKey: string) => {
  const { Body } = await s3
    .getObject({ Bucket: bucket, Key: imageKey })
    .promise();

  if (!Body) throw new Error("The fallback image is not currently available!");
  const stream = Readable.from(Body as Buffer);

  return stream;
};

export const retrieveFallbackImage = async () => {
  const response = await fetch("http://localhost:3000/missing.jpg");

  if (!response.ok) throw new Error();

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const fallbackStream = Readable.from(buffer);
  return fallbackStream;
};

export const retrieveImage = async (imageKey: string) => {
  try {
    return await retrieveS3StoredImage(imageKey);
  } catch (error: any) {
    console.error(error);
    return await retrieveFallbackImage();
  }
};
