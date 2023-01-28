import { createInfoLabel } from "../layers/info-label";
import { pinsRenderer } from "../render/pins";

export const churchPinMediaQueries = {
  default: pinsRenderer(),
  "600": pinsRenderer(20, 3),
  "800": pinsRenderer(30, 4),
  "1000": pinsRenderer(35, 5),
} as const;

export const infoLabelMediaQueries = {
  default: createInfoLabel({ size: 28 }),
  "600": createInfoLabel({ size: 12, haloSize: 1.5 }),
  "800": createInfoLabel({ size: 16 }),
  "1000": createInfoLabel({ size: 20 }),
} as const;
