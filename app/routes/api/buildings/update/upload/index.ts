import type { ActionFunction } from "@remix-run/server-runtime";
import {
  unstable_parseMultipartFormData,
  unstable_composeUploadHandlers,
} from "@remix-run/server-runtime";
import { Readable } from "stream";
import { prisma } from "~/db.server";
import { uploadImageToS3 } from "~/src/aws/s3/upload";
import { getFileExtension } from "~/src/server/utils/file-extension.server";

export const action: ActionFunction = async ({ request }) => {
  const uploadHandler = unstable_composeUploadHandlers(
    async ({ data, name, filename }) => {
      const buildingId = name.split("_")[0];
      const stream = Readable.from(data);
      const extension = getFileExtension(filename);
      const key = await uploadImageToS3(stream, extension);
      await prisma.buildingPicture.create({
        data: { imageKey: key, buildingId },
      });

      return key;
    }
  );

  try {
    await unstable_parseMultipartFormData(request, uploadHandler);
    return null;
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};
