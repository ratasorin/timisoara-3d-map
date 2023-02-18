import { randomUUID } from "crypto";
import { bucket, s3 } from "~/src/aws/s3";
import type Readable from "stream";

export const uploadImageToS3 = async (file: Readable, extension: string) => {
  const key = `${randomUUID()}.${extension}`;
  try {
    const response = await s3
      .upload({ Bucket: bucket, Key: key, Body: file })
      .promise();

    return response.Key;
  } catch (error) {
    console.error("AWS THREW ERROR" + error);
    throw new Error(
      "There was an error uploading a file to amazon s3! Please try again later!"
    );
  }
};
