import S3 from "aws-sdk/clients/s3";

export const s3 = new S3({
  region: process.env.S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

export const bucket = process.env.S3_BUCKET_NAME!;
