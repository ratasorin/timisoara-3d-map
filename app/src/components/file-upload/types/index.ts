import type { Dispatch, SetStateAction } from "react";

export type FileState = {
  files: UploadFile[];
  setFiles: Dispatch<SetStateAction<UploadFile[]>>;
};

export type UploadFile = {
  url: string;
  source: File;
};
