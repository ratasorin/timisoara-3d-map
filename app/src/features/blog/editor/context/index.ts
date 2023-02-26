import { atom } from "jotai";
import type { SerializedEditorState } from "lexical";

export const editorStateAtom = atom<{
  richContent: SerializedEditorState | undefined;
  textContent: string;
}>({ richContent: undefined, textContent: "" });
