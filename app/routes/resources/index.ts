import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  throw new Error("Profile picture missing!");
};
