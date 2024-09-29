"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadImageToS3 = async (
  base64: string,
  key: string
): Promise<string> => {
  const [, base64Data] = base64.split(",");
  const buffer = Buffer.from(base64Data, "base64");

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: base64.split(";")[0].split(":")[1],
  });

  try {
    await s3Client.send(command);
    if (command.input.Key === undefined) {
      throw new Error("Key is undefined");
    }
    return command.input.Key;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
};
