import { useEffect, useRef, useState } from "react";
import type SceneView from "@arcgis/core/views/SceneView";
import { createScene } from "./scene";
import {
  churchPinMediaQueries,
  infoLabelMediaQueries,
} from "./utils/responsive";

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<SceneView>();
  //   const { width } = useWindowSize();

  useEffect(() => {
    if (mapContainer.current && !scene) {
      const scene = createScene(mapContainer.current);
      setScene(scene);
    }

    // coordinates
    //   .pipe(
    //     tap(([lat, long]) => {
    //       view
    //         ?.goTo({
    //           center: [long, lat],
    //           zoom: 17,
    //           tilt: 0,
    //         })
    //         .then(() => {
    //           view?.goTo({
    //             tilt: 65,
    //           });
    //         });
    //     })
    //   )
    //   .subscribe();
  }, [scene]);

  // useEffect(() => {
  //   //     if (width) {
  //   //       const rawQuery = MEDIA_QUERIES.reduce((prev, curr) => {
  //   //         if (width > Number(curr)) return curr;
  //   //         if (width > Number(prev) && width < Number(curr)) return curr;
  //   //         else return prev;
  //   //       }, "600");
  //   //       const query = width > Number(rawQuery) ? "default" : rawQuery;
  //   scene?.map.layers.forEach((layer) => {
  //     if (layer.id === "PINS") {
  //       layer.set("labelingInfo", infoLabelMediaQueries.default);
  //       layer.set("renderer", churchPinMediaQueries.default);
  //     }
  //   });
  //   //     }
  // }, [scene]);

  return (
    <div style={{ position: "absolute", height: "100vh", width: "100vw" }}>
      <div
        style={{
          position: "relative",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw",
        }}
        ref={mapContainer}
      />
    </div>
  );
};

export default Map;
