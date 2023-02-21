import type { FunctionComponent } from "react";
import type { FileState } from "./types";

const DragAndDrop: FunctionComponent<FileState> = ({ files, setFiles }) => {
  return (
    <div className="m-auto rounded-xl bg-slate-100 p-4">
      <div className="group relative flex h-64 w-full items-center justify-center">
        <div className="absolute h-full w-full rounded-xl border-4 border-dashed bg-white bg-opacity-80 shadow-lg backdrop-blur-xl transition duration-300 group-hover:scale-105 group-hover:bg-opacity-70"></div>
        <input
          accept=".jpg, .jpeg .png, .svg, .webp"
          className="relative z-10 h-full w-full cursor-pointer opacity-0"
          type="file"
          name="bgfile"
          id="bgfile"
          multiple={true}
          onChange={(event) => {
            const uploadedFileList = event.currentTarget.files;
            if (!uploadedFileList) return;
            const uploadedFiles = Array.from(uploadedFileList);
            setFiles([
              ...files,
              ...uploadedFiles.map((file) => ({
                url: URL.createObjectURL(file),
                source: file,
              })),
            ]);
          }}
        />
        <div className="m-auo absolute top-0 right-0 bottom-0 left-0 flex h-full w-full items-center justify-center p-4">
          <div className="space-y-6 text-center">
            <div className="m-auto w-32 sm:w-40" />
            <p className="font-mono text-sm text-gray-700">
              <i>"Drag and drop"</i> aici sau{" "}
              <label
                htmlFor="dragOver"
                title="Upload a file"
                className="relative z-0 block cursor-pointer font-mono text-blue-500"
              >
                Încărcați un fișier
              </label>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;
