import type { ActionArgs } from "@remix-run/node";
import { redirect } from "react-router";
import { prisma } from "~/db.server";
import { getLoginRouteWithContext } from "~/src/server/redirect.server";
import { getSessionFromCookie } from "~/src/server/session-cookies.server";
import { getUser } from "~/src/server/user.server";

export const action = async ({ request, params }: ActionArgs) => {
  const form = await request.formData();
  const description = form.get("description")?.toString();
  const id = params["building_id"];

  const sessionId = await getSessionFromCookie(request);

  if (!sessionId) {
    const loginRoute = getLoginRouteWithContext(request);
    throw redirect(loginRoute);
  }

  const user = await getUser(sessionId);

  if (!user) {
    const loginRoute = getLoginRouteWithContext(request);
    throw redirect(loginRoute);
  }

  if (!id || !description)
    throw new Error("Unspecified id or description! Cannot update!");

  await prisma.building.update({
    where: {
      id,
    },
    data: {
      description,
      userId: user.id,
    },
  });

  return null;
};
