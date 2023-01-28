import { lazy } from "react";
import { ClientOnly } from "src/utils/client-only";

const ClientMap = lazy(() => import("src/features/map"));

const MapRoute = () => {
  return (
    <ClientOnly>
      <ClientMap />
    </ClientOnly>
  );
};

export default MapRoute;
