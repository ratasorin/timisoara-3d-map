import { redirectToAuthWithContext } from "./redirect.server";
import { getSessionFromCookie } from "./session-cookies.server";
import { getUser } from "./user.server";

export const getAuthenticatedUserOrRedirect = async (request: Request) => {
  const sessionId = await getSessionFromCookie(request);
  if (!sessionId) throw redirectToAuthWithContext(request);

  const user = await getUser(sessionId);
  if (!user) throw redirectToAuthWithContext(request);

  return user;
};
