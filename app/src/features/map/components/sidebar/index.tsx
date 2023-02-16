import { useLocation } from "@remix-run/react";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Building } from "@prisma/client";
import { MdArrowForwardIos } from "react-icons/md";

const Sidebar = () => {
  const location = useLocation();
  const buildingSearchQuery = useMemo(
    () => new URLSearchParams(location.search).get("building-name"),
    [location]
  );

  const buildingResponse = useQuery<Building[]>(
    ["buildings", buildingSearchQuery],
    () => {
      if (!buildingSearchQuery && buildingSearchQuery !== "") return [];
      return fetch(
        `http://localhost:3000/api/buildings/retrieve/${buildingSearchQuery}`
      ).then((response) => {
        return response.json();
      });
    }
  );

  const buildings = buildingResponse.data;
  if (!buildings || (!buildingSearchQuery && buildingSearchQuery !== ""))
    return null;
  return (
    <div className="absolute top-0 left-0 h-full w-96 rounded-tr-lg rounded-br-lg bg-white px-4 pt-28 font-mono shadow-lg">
      {buildings.map((building) => (
        <div className="mb-4" key={building.id}>
          <button className="flex w-full flex-row items-center justify-between rounded-md p-2 font-bold hover:bg-slate-200">
            <span className="text-left">{building.name}</span>
            <MdArrowForwardIos className="text-xl" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
