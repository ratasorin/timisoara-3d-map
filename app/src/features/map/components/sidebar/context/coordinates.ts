import { atom } from "jotai";

interface Coordinates {
  x: number | null;
  y: number | null;
}

export const centerCoordinatesAtom = atom<Coordinates>({
  x: null,
  y: null,
});
