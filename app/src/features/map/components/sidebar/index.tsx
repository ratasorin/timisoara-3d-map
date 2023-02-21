import { useLocation } from "@remix-run/react";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Carousel from "./components/carousel";
import AddPhotos from "./components/add-photos";
import * as Separator from "@radix-ui/react-separator";
import Header from "./components/header";
import type { QueriedBuildings } from "~/routes/api/buildings/read/$";
import * as ScrollArea from "@radix-ui/react-scroll-area";

const Sidebar = () => {
  const location = useLocation();
  const buildingSearchQuery = useMemo(
    () => new URLSearchParams(location.search).get("building-name"),
    [location]
  );

  const buildingResponse = useQuery<QueriedBuildings>(
    ["buildings", buildingSearchQuery],
    () => {
      if (!buildingSearchQuery && buildingSearchQuery !== "") return [];
      return fetch(
        `http://localhost:3000/api/buildings/read/${buildingSearchQuery}`
      ).then((response) => {
        return response.json();
      });
    }
  );

  if (!buildingSearchQuery && buildingSearchQuery !== "") return null;
  if (buildingResponse.isLoading)
    return (
      <div className="absolute top-0 left-0 flex h-full w-96 justify-center rounded-tr-lg rounded-br-lg bg-white px-4 pt-28 font-mono shadow-lg">
        Loading...
      </div>
    );

  if (buildingResponse.error)
    return (
      <div className="absolute top-0 left-0 flex h-full w-96 justify-center rounded-tr-lg rounded-br-lg bg-white px-4 pt-28 font-mono text-red-500 shadow-lg">
        There was an error!
      </div>
    );

  const buildings = buildingResponse.data;
  if (!buildings || !buildings.length)
    return (
      <div className="absolute top-0 left-0 flex h-full w-96 justify-center rounded-tr-lg rounded-br-lg bg-white px-4 pt-28 font-mono shadow-lg">
        No buildings found :/
      </div>
    );

  return (
    <div className="absolute top-0 left-0 h-full w-full max-w-sm overflow-y-auto rounded-tr-lg rounded-br-lg bg-white px-4 pt-28 font-mono shadow-lg">
      {buildings.map((building) => (
        <div className="mb-5" key={building.id}>
          <Header building={building} />
          <Carousel
            images={building.BuildingPictures.map(
              (picture) => picture.imageKey
            )}
            buildingName={building.name}
          />
          <AddPhotos buildingId={building.id} buildingName={building.name} />
          <Separator.Root className="mt-5 bg-slate-400 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px" />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
