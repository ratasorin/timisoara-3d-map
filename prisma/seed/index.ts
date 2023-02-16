import { Buildings } from "library/map/assets";
import { prisma } from "prisma";

const seed = async () => {
  const { id: userId } = await prisma.user.create({
    data: {
      email: "ratasorin0@gmail.com",
      name: "Rata Sorin",
      password: "NarutoLover",
      picture: {
        create: {
          imageKey: "naruto.png",
        },
      },
    },
  });
  const { id: churchTagId } = await prisma.buildingTag.create({
    data: {
      tag: "biserică",
    },
    select: { id: true },
  });

  const { id: bisericaRomanoCatolicaDinElisabetinId } =
    await prisma.building.create({
      data: {
        name: Buildings[0].name,
        description: `${Buildings[0].name} is a very beautiful church!`,
        osmId: Buildings[0].osm_id,
        buildingTagId: churchTagId,
        userId,
        BuildingPictures: {
          createMany: {
            data: [
              {
                imageKey: "19af75212efcd147c643652342de4765.jpg",
              },
            ],
          },
        },
      },
      select: { id: true },
    });

  const { id: catedralaMitropolitanaOrtodoxaId } = await prisma.building.create(
    {
      data: {
        name: Buildings[1].name,
        description: `${Buildings[1].name} is a very beautiful church!`,
        osmId: Buildings[1].osm_id,
        buildingTagId: churchTagId,
        userId,
        BuildingPictures: {
          createMany: {
            data: [
              {
                imageKey:
                  "Catedrala-Mitropolitana-din-Timisoara-20110217111616.jpg",
              },
              {
                imageKey: "OIP.jfif",
              },
              {
                imageKey: "R.jfif",
              },
            ],
          },
        },
      },
      select: { id: true },
    }
  );

  const { id: bisericaAdormireaMaiciiDomnuluiId } =
    await prisma.building.create({
      data: {
        name: Buildings[2].name,
        description: `${Buildings[2].name} is a very beautiful church!`,
        osmId: Buildings[2].osm_id,
        buildingTagId: churchTagId,
        userId,
      },
      select: { id: true },
    });
};

seed()
  .then(() => console.log("Seeding Script Executed!"))
  .catch(console.log);
