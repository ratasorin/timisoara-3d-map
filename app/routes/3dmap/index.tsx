import { lazy } from "react";
import Fallback from "src/features/map/components/fallback";
import { ClientOnly } from "app/src/utils/client-only";

const ClientMap = lazy(() => import("src/features/map"));

const MapRoute = () => {
  return (
    <ClientOnly fallback={<Fallback />}>
      <ClientMap />
    </ClientOnly>
  );
};

export default MapRoute;
