import { useEffect, useRef, useState } from "react";
import type SceneView from "@arcgis/core/views/SceneView";
import { createScene } from "./scene";
import {
  churchPinMediaQueries,
  infoLabelMediaQueries,
  updateElementSize,
} from "./utils/responsive";
import { useWindowSize } from "app/src/hooks/window-size";
import { useAtomValue } from "jotai";
import { centerCoordinatesAtom } from "~/src/features/map/components/sidebar/context/coordinates";

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<SceneView>();
  const { width } = useWindowSize();
  const centerCoordinates = useAtomValue(centerCoordinatesAtom);
  useEffect(() => {
    if (mapContainer.current && !scene) {
      const scene = createScene(mapContainer.current);
      setScene(scene);
    }
  }, [scene]);

  useEffect(() => {
    if (!centerCoordinates.x || !centerCoordinates.y || !scene) return;
    scene
      .goTo({
        center: [centerCoordinates.x, centerCoordinates.y],
        tilt: 0,
        zoom: 18,
      })
      .then(() => {
        scene.goTo({
          tilt: 65,
        });
      });
  }, [centerCoordinates, scene]);

  useEffect(() => {
    if (!width || !scene) return;

    const size = updateElementSize(width);
    scene.map.layers.forEach((layer) => {
      if (layer.id === "PINS") {
        layer.set("labelingInfo", infoLabelMediaQueries[size]);
        layer.set("renderer", churchPinMediaQueries[size]);
      }
    });
  }, [width, scene]);

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
