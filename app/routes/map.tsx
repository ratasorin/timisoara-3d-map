import { ClientOnly } from "~/src/utils/client-only";
import Fallback from "library/map/components/fallback";
import type { ShouldRevalidateFunction } from "react-router";
import { Outlet } from "react-router";
// import { lazy } from "react";
// const ClientMap = lazy(() => import("library/map"));

// do not reload the 3d map itself when updating url query params as it will decrease performance
export const shouldRevalidate: ShouldRevalidateFunction = () => false;

const Map = () => {
  return (
    <>
      <ClientOnly fallback={<Fallback />}>
        {/* <ClientMap /> */}
        <div className="flex h-screen w-screen items-center justify-center bg-orange-200 font-mono font-semibold tracking-widest">
          <span className="rounded-md bg-white p-2">Map replacement</span>
        </div>
      </ClientOnly>
      <Outlet />
    </>
  );
};

export default Map;
