import type { FunctionComponent } from "react";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { MdClose, MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "~/src/react-query";
import DragAndDrop from "~/src/components/file-upload/drag-and-drop";
import Preview from "~/src/components/file-upload/preview";

const AddPhotos: FunctionComponent<{
  buildingId: string;
  buildingName: string;
}> = ({ buildingId, buildingName }) => {
  const [files, setFiles] = useState<{ url: string; source: File }[]>([]);
  const mutation = useMutation(
    () => {
      const form = new FormData();
      files.forEach(({ source }, index) => {
        form.set(`${buildingId}_${index}`, source);
      });

      return fetch("/api/buildings/update/upload", {
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
        <button className="inline-flex items-center rounded-md bg-white px-4 py-3 font-bold leading-none hover:bg-zinc-100">
          <span className="mr-2">Adaugă poze</span>
          <MdOutlineAddPhotoAlternate className="text-xl" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="absolute inset-0 z-20 bg-black/30 data-[state=open]:animate-overlay-show" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-30 max-h-screen w-11/12 max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg data-[state=open]:animate-content-show">
          <Dialog.Title className="flex flex-row font-mono text-base font-semibold leading-tight text-black">
            <div>
              Adauga poze pentru <span className="italic">{buildingName}</span>
            </div>
            <Dialog.Close asChild>
              <button
                className="inline-flex h-10 w-10 appearance-none items-center justify-center rounded-full p-2 text-3xl text-black hover:bg-zinc-100"
                aria-label="Close"
              >
                <MdClose />
              </button>
            </Dialog.Close>
          </Dialog.Title>
          <Dialog.Description className="text-small mt-3 mb-5 font-mono leading-tight text-black">
            Îmbogățește galeria vizuală pentru această clădire prin pozele dvs.
          </Dialog.Description>

          <DragAndDrop files={files} setFiles={setFiles} />
          <Preview files={files} setFiles={setFiles} />

          <div className="mt-6 flex justify-end">
            <Dialog.Close asChild>
              <button
                onClick={() => mutation.mutate()}
                className="inline-flex items-center justify-center rounded-md px-4 py-3 font-medium leading-none text-slate-900 hover:bg-zinc-100"
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
