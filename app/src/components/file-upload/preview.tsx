import type { FunctionComponent } from "react";
import { MdOutlineClose } from "react-icons/md";
import type { FileState } from "./types";

const Preview: FunctionComponent<FileState> = ({ files, setFiles }) => {
  return (
    <div className="mt-6 flex min-h-[9rem] w-full flex-row items-center justify-center overflow-x-auto rounded-xl border-4 p-2">
      {!files.length ? (
        <span className="rounded-lg bg-white p-2 text-center font-mono text-xs">
          Aici vor apărea pozele pe care le încărcați
        </span>
      ) : null}
      <div className="flex min-w-max flex-row">
        {files.map((file) => (
          <div key={file.url} className="relative m-2 h-36">
            <img
              src={file.url}
              alt={file.url}
              className="max-h-36 rounded-lg"
            />
            <MdOutlineClose
              className="absolute top-2 right-2 cursor-pointer rounded-full border-2 border-red-500 bg-white text-3xl text-red-700"
              onClick={() => {
                const remainingFiles = files.filter((f) => f.url !== file.url);
                setFiles(remainingFiles);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preview;
