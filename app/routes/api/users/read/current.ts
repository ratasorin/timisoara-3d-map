import type { LoaderArgs } from "@remix-run/server-runtime";
import { getSessionFromCookie } from "~/src/server/session-cookies.server";
import { getUser } from "~/src/server/user.server";

export const loader = async ({ request }: LoaderArgs) => {
  const sessionId = await getSessionFromCookie(request);
  if (!sessionId) return null;

  const userFromSession = await getUser(sessionId);

  return userFromSession;
};

export type QueriedUser = Awaited<ReturnType<typeof loader>>;
