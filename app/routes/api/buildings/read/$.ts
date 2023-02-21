import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { prisma } from "~/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  const buildingCriteria = params["*"] || "";
  const buildings = await prisma.building.findMany({
    where: {
      OR: [
        { id: { equals: buildingCriteria, mode: "insensitive" } },
        { name: { contains: buildingCriteria, mode: "insensitive" } },
        {
          BuildingTag: {
            tag: { contains: buildingCriteria, mode: "insensitive" },
          },
        },
      ],
    },
    select: {
      BuildingPictures: true,
      author: {
        include: { picture: true },
      },
      BuildingTag: true,
      description: true,
      name: true,
      osmId: true,
      id: true,
    },
    orderBy: { name: "asc" },
  });

  return buildings;
};

export type QueriedBuildings = Awaited<ReturnType<typeof loader>>;
