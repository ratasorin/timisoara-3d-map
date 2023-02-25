import type { ActionFunction } from "@remix-run/server-runtime";
import {
  unstable_parseMultipartFormData,
  unstable_composeUploadHandlers,
} from "@remix-run/server-runtime";
import { Readable } from "stream";
import { uploadImageToS3 } from "~/src/aws/s3/upload";
import { getFileExtension } from "~/src/server/utils/file-extension.server";

export const action: ActionFunction = async ({ request }) => {
  const uploadHandler = unstable_composeUploadHandlers(
    async ({ data, filename }) => {
      const stream = Readable.from(data);
      const extension = getFileExtension(filename);
      const key = await uploadImageToS3(stream, extension);

      return key;
    }
  );

  try {
    const form = await unstable_parseMultipartFormData(request, uploadHandler);
    const key = form.get("blog-image");
    return key;
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};
