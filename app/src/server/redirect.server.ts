import { redirect } from "react-router";

export const redirectToAuthWithContext = (request: Request) => {
  const originalURL = new URL(request.url);
  const oldSearchParams = originalURL.searchParams;
  oldSearchParams.set("redirect-back-to", originalURL.href);
  const newSearchParams = oldSearchParams.toString();

  return redirect(`/auth?${newSearchParams}`);
};
