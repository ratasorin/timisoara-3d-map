import { useLocation } from "@remix-run/react";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { MdArrowForwardIos } from "react-icons/md";
import { getBuildingCoordinates } from "library/map/layers/buildings";
import { useSetAtom } from "jotai";
import { centerCoordinatesAtom } from "./context/coordinates";
import Carousel from "./components/carousel";
import type { QueriedBuilding } from "./types";
import AddPhotos from "./components/add-photos";
import * as Separator from "@radix-ui/react-separator";

const Sidebar = () => {
  const location = useLocation();
  const buildingSearchQuery = useMemo(
    () => new URLSearchParams(location.search).get("building-name"),
    [location]
  );

  const setCenterCoordinates = useSetAtom(centerCoordinatesAtom);

  const buildingResponse = useQuery<QueriedBuilding[]>(
    ["buildings", buildingSearchQuery],
    () => {
      if (!buildingSearchQuery && buildingSearchQuery !== "") return [];
      return fetch(
        `http://localhost:3000/api/buildings/images/retrieve/${buildingSearchQuery}`
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
    <div className="absolute top-0 left-0 h-full w-96 overflow-y-auto rounded-tr-lg rounded-br-lg bg-white px-4 pt-28 font-mono shadow-lg">
      {buildings.map((building) => (
        <div className="mb-5" key={building.id}>
          <button
            className="flex w-full flex-row items-center justify-between rounded-md p-2 font-bold hover:bg-zinc-100"
            onClick={async () => {
              const { x, y } = await getBuildingCoordinates(building.osmId);
              setCenterCoordinates({ x, y });
            }}
          >
            <span className="text-left">{building.name}</span>
            <MdArrowForwardIos className="text-xl" />
          </button>
          <Carousel
            images={building.BuildingPictures.map(
              (picture) => picture.imageKey
            )}
            buildingName={building.name}
          />
          <AddPhotos buildingId={building.id} buildingName={building.name} />
          <Separator.Root className=" mt-5 bg-slate-700 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px" />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
