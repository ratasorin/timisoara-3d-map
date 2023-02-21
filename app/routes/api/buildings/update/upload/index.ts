import type { ActionFunction } from "@remix-run/server-runtime";
import {
  unstable_parseMultipartFormData,
  unstable_composeUploadHandlers,
} from "@remix-run/server-runtime";
import { Readable } from "stream";
import { prisma } from "~/db.server";
import { uploadImageToS3 } from "~/src/aws/s3/upload";

export const action: ActionFunction = async ({ request }) => {
  const uploadHandler = unstable_composeUploadHandlers(
    async ({ data, name, filename }) => {
      const buildingId = name.split("_")[0];

      if (!filename)
        throw new Error(
          "There was an error! The file has no name or extension"
        );

      const hasExtension = filename.includes(".");
      if (!hasExtension)
        throw new Error(
          "There was an error! One of the files didn't have any extension!"
        );

      const extension = filename.split(".").reverse()[0];
      if (extension === "")
        throw new Error(
          "The extension is undefined! Please add an extension after `.`"
        );

      const stream = Readable.from(data);
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
