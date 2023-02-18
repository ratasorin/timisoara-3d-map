import type { BuildingPicture, User } from "@prisma/client";

export interface QueriedBuilding {
  id: string;
  name: string;
  BuildingPictures: BuildingPicture[];
  author: User;
  description: string;
  osmId: string;
}
