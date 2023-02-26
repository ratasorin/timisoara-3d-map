import { ClientOnly } from "~/src/utils/client-only";
import Fallback from "library/map/components/fallback";
import type { ShouldRevalidateFunction } from "@remix-run/react";
import Navigation from "~/src/features/map/components/navigation";
import Sidebar from "~/src/features/map/components/sidebar";
import BuildingInformationModal from "~/src/features/map/components/information-modal";
import { lazy } from "react";
const ClientMap = lazy(() => import("library/map"));

// do not reload the 3d map itself when updating url query params as it will decrease performance
export const shouldRevalidate: ShouldRevalidateFunction = () => false;
const Map = () => {
  return (
    <>
      <ClientOnly fallback={<Fallback />}>
        <ClientMap />
      </ClientOnly>
      <Navigation />
      <Sidebar />
      <BuildingInformationModal />
    </>
  );
};

export default Map;
