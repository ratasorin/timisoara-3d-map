import type { BuildingPicture, User } from "@prisma/client";

export type Building = {
  id: string;
  name: string;
  BuildingPictures: BuildingPicture[];
  author: User;
  description: string;
  osmId: string;
};
