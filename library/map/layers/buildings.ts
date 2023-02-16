import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { BUILDINGS_QUERY } from "../utils/build-query";
import type Graphic from "@arcgis/core/Graphic";
import type Circle from "@arcgis/core/geometry/Circle";
import { buildingRenderer } from "../render/buildings";
import { BUILDING_LAYER_URL } from "../constants";

export const buildingsLayer = new FeatureLayer({
  id: "buildings",
  url: BUILDING_LAYER_URL,
  labelsVisible: false,
  opacity: 1,
  definitionExpression: BUILDINGS_QUERY,
  renderer: buildingRenderer,
  popupTemplate: {
    title: "{NAME}",
    content: async (building: Graphic) => {
      const buildingName = building.attributes.name as string;
      // return fetch(`/api/church-info/${monument}`).then(async (r) => {
      //   const response = (await r.json()) as ServerResponse<ChurchInfo>;
      //   if (response.error) {
      //     openPopup("success-popup", {
      //       payload: response.payload,
      //       type: "Error",
      //     } as PopupBuilder);
      //     return "";
      //   } else return `<p>${response.payload?.churchDescription}</p>`;
      // });

      // fetch the church info;
    },
  },
});

const query = buildingsLayer.createQuery();
query.where = BUILDINGS_QUERY;
query.returnGeometry = true;

export const buildings = buildingsLayer
  .queryFeatures(query)
  .then((response) => {
    return response.features.map((church) => {
      return {
        name: church.attributes.name as string,
        lat: (church.geometry as Circle).centroid.latitude,
        long: (church.geometry as Circle).centroid.longitude,
      };
    });
  });
