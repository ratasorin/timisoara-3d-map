import { Buildings } from "library/map/assets";
import { prisma } from "~/db.server";

const seed = async () => {
  const { id: sorinId } = await prisma.user.create({
    data: {
      email: "ratasorin0@gmail.com",
      name: "Rata Sorin",
      password: "SorinLikesNadira",
      picture: {
        create: {
          imageKey: "sorin-profile-picture.png",
        },
      },
    },
  });

  const { id: nadiraId } = await prisma.user.create({
    data: {
      email: "nadira.bodrogean@gmail.com",
      name: "Nadira Bodrogean",
      password: "NadiraLikesSorin",
      picture: {
        create: {
          imageKey: "nadira-profile-picture.png",
        },
      },
    },
  });

  const { id: churchTagId } = await prisma.buildingTag.create({
    data: {
      tag: "biserica",
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
        userId: sorinId,
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
        userId: nadiraId,
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
        userId: nadiraId,
      },
      select: { id: true },
    });
};

seed()
  .then(() => console.log("Seeding Script Executed!"))
  .catch(console.log);
