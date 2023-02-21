import { atom } from "jotai";

export const buildingIdAtom = atom<string | undefined>(undefined);

export const infoModalOpenAtom = atom(false);
export const editModalOpenAtom = atom(false);
