import type { LoaderFunction } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { retrieveImage } from "~/src/aws/s3/retrieve";

/**
 *  This is a resource route, so it can only be called inside an image tag such as: <img src="HOST_URL/resources/#id" />,
 *  providing the asset as a Readable Stream, ready to be displayed by the browser.
 *  Throwing errors from this method is redundant because they cannot be handled (event listeners like: <img onError={{...}} src="..." />
 *  cannot be executed on the server because there is no Javascript available to bind the listener to the HTML tag).
 *  Errors are thereby handled by retrieving a static, basic 404 image from a CDN, and displaying it instead of the original image.
 *  Any further errors cannot be handled for the reason mentioned above.
 */
export const loader: LoaderFunction = async ({ params }) => {
  const imageKey = params.key!;
  const stream = await retrieveImage(imageKey);
  return new Response(stream, { headers: { "Content-Type": "image/png" } });
};
