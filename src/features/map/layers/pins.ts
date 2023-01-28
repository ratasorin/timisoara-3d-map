import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { pinsRenderer } from "../render/pins";
import { BUILDINGS_QUERY } from "../utils/build-query";
// import { churchPinMediaQueries } from "../utils/responsive";
import { createInfoLabel } from "./info-label";

export const pinsLayer = new FeatureLayer({
  id: "PINS",
  portalItem: {
    id: "3677599f43b9484aa01a0ee212beb410",
  },
  definitionExpression: BUILDINGS_QUERY,
  elevationInfo: {
    // elevation mode that will place points on top of the buildings or other SceneLayer 3D objects
    mode: "relative-to-scene",
  },
  renderer: pinsRenderer(),
  labelsVisible: true,
  labelingInfo: [createInfoLabel({})],
});
