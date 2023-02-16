import { useLocation } from "@remix-run/react";
import { useAtom } from "jotai";
import { sidebarOpenAtom } from "./context/sidebar-open";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Building } from "@prisma/client";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);
  const location = useLocation();
  const buildingSearchQuery = useMemo(
    () => new URLSearchParams(location.search).get("building-name"),
    [location]
  );

  const buildingResponse = useQuery<Building[]>(
    ["buildings", buildingSearchQuery],
    () => {
      if (!buildingSearchQuery) return [];
      return fetch(
        `http://localhost:3000/api/buildings/retrieve/${buildingSearchQuery}`
      ).then((response) => {
        setSidebarOpen(true);
        return response.json();
      });
    }
  );

  const buildings = buildingResponse.data;
  if (!buildings || !sidebarOpen) return null;
  return (
    <div className="absolute top-0 left-0 h-full w-96 rounded-tr-lg rounded-br-lg bg-white shadow-lg">
      {buildings.map((building) => (
        <div>P</div>
      ))}
    </div>
  );
};

export default Sidebar;
