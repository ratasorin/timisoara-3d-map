import LabelClass from "@arcgis/core/layers/support/LabelClass";
interface Font {
  size?: number;
  family?: string;
  style?: "italic" | "normal" | "oblique";
  haloSize?: number;
}

export const createInfoLabel = (font: Font) => {
  const infoLabel = new LabelClass({
    labelExpressionInfo: { expression: "$feature.name" },
    labelPlacement: "above-after",
    symbol: {
      type: "text",
      color: "black",
      haloSize: font.haloSize || 2,
      haloColor: "white",
      backgroundColor: "white",
      lineWidth: 180,
      font: {
        size: font.size || 20,
        family: font.family || "monospace",
        style: font.style || "italic",
      },
    },
  });

  return infoLabel;
};
