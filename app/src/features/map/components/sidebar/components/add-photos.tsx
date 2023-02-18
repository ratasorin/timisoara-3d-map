import type { FunctionComponent } from "react";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  MdClose,
  MdOutlineAddPhotoAlternate,
  MdOutlineClose,
} from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "~/src/react-query";

const AddPhotos: FunctionComponent<{
  buildingId: string;
  buildingName: string;
}> = ({ buildingId, buildingName }) => {
  const [files, setFiles] = useState<{ src: string; file: File }[]>([]);
  const mutation = useMutation(
    () => {
      const form = new FormData();
      files.forEach(({ file }, index) => {
        form.set(`${buildingId}_${index}`, file);
      });

      return fetch("http://localhost:3000/api/buildings/images/upload", {
        method: "POST",
        body: form,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["buildings"] });
      },
    }
  );

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="inline-flex items-center rounded-md bg-white px-4 py-4 font-bold leading-none shadow hover:shadow-md">
          <span className="mr-2">Adaugă poze</span>
          <MdOutlineAddPhotoAlternate className="text-xl" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="absolute inset-0 z-20 bg-black/30 data-[state=open]:animate-overlay-show" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-30 max-h-screen w-screen max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg focus:outline-none data-[state=open]:animate-content-show">
          <Dialog.Title className="flex flex-row font-mono text-lg font-semibold text-black">
            <div>
              Adauga poze pentru <span className="italic">{buildingName}</span>
            </div>
            <Dialog.Close asChild>
              <button
                className="inline-flex h-10 w-10 appearance-none items-center justify-center rounded-full p-2 text-3xl text-black focus:shadow-md focus:outline-none"
                aria-label="Close"
              >
                <MdClose />
              </button>
            </Dialog.Close>
          </Dialog.Title>
          <Dialog.Description className="mt-3 mb-5 font-mono text-lg leading-normal text-black">
            Îmbogățește galeria vizuală pentru această clădire prin pozele dvs.
          </Dialog.Description>
          <div className="m-auto rounded-xl bg-slate-100 p-6">
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
                      src: URL.createObjectURL(file),
                      file,
                    })),
                  ]);
                }}
              />
              <div className="m-auo absolute top-0 right-0 bottom-0 left-0 flex h-full w-full items-center justify-center">
                <div className="space-y-6 text-center">
                  <div className="m-auto w-32 sm:w-40" />
                  <p className="font-mono text-lg text-gray-700">
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
            <div className="mt-6 flex min-h-[9rem] w-full flex-row items-center justify-center overflow-x-scroll rounded-xl border-4 p-2">
              {!files.length ? (
                <span className="rounded-lg bg-white p-2 font-mono text-sm">
                  Aici vor apărea pozele pe care le încărcați
                </span>
              ) : null}
              <div className="flex min-w-max flex-row">
                {files.map((file) => (
                  <div key={file.src} className="relative m-2 h-36">
                    <img
                      src={file.src}
                      alt={file.src}
                      className="max-h-36 rounded-lg"
                    />
                    <MdOutlineClose
                      className="absolute top-2 right-2 cursor-pointer rounded-full border-2 border-red-500 bg-white text-3xl text-red-700"
                      onClick={() => {
                        const remainingFiles = files.filter(
                          (f) => f.src !== file.src
                        );
                        setFiles(remainingFiles);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Dialog.Close asChild>
              <button
                onClick={() => mutation.mutate()}
                className="inline-flex items-center justify-center rounded-md p-4 font-medium leading-none text-slate-900 shadow-md focus:outline focus:outline-2"
              >
                Încarcați fișierele
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddPhotos;
