import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { prisma } from "~/db.server";

export const loader: LoaderFunction = async ({ params }) => {
  const buildingName = params["*"] || "";
  const buildings = await prisma.building.findMany({
    where: {
      OR: [
        { name: { contains: buildingName, mode: "insensitive" } },
        {
          BuildingTag: { tag: { contains: buildingName, mode: "insensitive" } },
        },
      ],
    },
    select: {
      BuildingPictures: true,
      author: true,
      description: true,
      name: true,
      osmId: true,
      id: true,
    },
  });

  return json(buildings);
};
