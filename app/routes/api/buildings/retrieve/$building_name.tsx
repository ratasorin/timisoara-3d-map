import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { prisma } from "prisma";

export const loader: LoaderFunction = async ({ params }) => {
  const buildingName = params["building_name"] || "";
  console.log(buildingName);
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

  const allBuildings = await prisma.building.findMany({});
  console.log({ buildings, allBuildings });

  return json(buildings);
};
