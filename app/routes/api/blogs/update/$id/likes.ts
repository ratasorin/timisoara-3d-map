import type { ActionArgs } from "@remix-run/server-runtime";
import { prisma } from "~/db.server";
import { getAuthenticatedUserOrRedirect } from "~/src/server/auth.flow.server";

export const action = async ({ request, params }: ActionArgs) => {
  const buildingId = params["id"];
  await getAuthenticatedUserOrRedirect(request);

  const likes = Number((await request.formData()).get("likes"));

  if (!buildingId) throw new Error("Cannot find the building id!");

  try {
    await prisma.blog.update({
      where: { id: buildingId },
      data: { likes: { increment: likes } },
    });
    return { error: null };
  } catch (err) {
    console.error(err);
    return { error: "There was an error updating the likes!" };
  }
};
