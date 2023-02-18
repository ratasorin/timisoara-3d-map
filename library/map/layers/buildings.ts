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
      // return fetch(`/api/building-info/${monument}`).then(async (r) => {
      //   const response = (await r.json()) as ServerResponse<ChurchInfo>;
      //   if (response.error) {
      //     openPopup("success-popup", {
      //       payload: response.payload,
      //       type: "Error",
      //     } as PopupBuilder);
      //     return "";
      //   } else return `<p>${response.payload?.buildingDescription}</p>`;
      // });

      // fetch the building info;
    },
  },
});

const query = buildingsLayer.createQuery();
query.where = BUILDINGS_QUERY;
query.returnGeometry = true;

export const buildings = buildingsLayer
  .queryFeatures(query)
  .then((response) => {
    return response.features.map((building) => {
      return {
        name: building.attributes.name as string,
        lat: (building.geometry as Circle).centroid.latitude,
        long: (building.geometry as Circle).centroid.longitude,
      };
    });
  });

export const getBuildingCoordinates = async (buildingOsmId: string) => {
  const q = buildingsLayer.createQuery();
  q.where = `osm_id=${buildingOsmId}`;
  q.returnGeometry = true;

  const building = await buildingsLayer.queryFeatures(q);
  const circle = building.features[0].geometry as Circle;
  console.log({ circle });
  return { x: circle.centroid.longitude, y: circle.centroid.latitude };
};
