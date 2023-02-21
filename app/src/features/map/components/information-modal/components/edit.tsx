import * as Dialog from "@radix-ui/react-dialog";
import {
  buildingIdAtom,
  editModalOpenAtom,
  infoModalOpenAtom,
} from "../context";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { MdClose } from "react-icons/md";
import * as Avatar from "@radix-ui/react-avatar";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { QueriedUser } from "~/routes/api/users/read/current";
import { Form } from "@remix-run/react";
import { queryClient } from "~/src/react-query";
import type { FunctionComponent } from "react";
import type { QueriedBuildings } from "~/routes/api/buildings/read/$";

type Building = QueriedBuildings[number];

const BuildingInformationModal: FunctionComponent<{
  building: Building;
}> = ({ building }) => {
  const setIsInfoModalOpen = useSetAtom(infoModalOpenAtom);
  const [isEditModalOpen, setIsEditModalOpen] = useAtom(editModalOpenAtom);

  const { data: user } = useQuery<QueriedUser>(["user"], () =>
    fetch("/api/users/read/current").then((r) => r.json())
  );

  const updateDescription = useMutation(
    (form: FormData) =>
      fetch(`/api/buildings/update/description/${building.id || "-"}`, {
        method: "POST",
        body: form,
      }),
    {
      onSuccess: () => {
        setIsInfoModalOpen(true);
        setIsEditModalOpen(false);
        queryClient.invalidateQueries(["buildings", building?.id]);
      },
      onError(error) {
        console.error(error);
      },
    }
  );

  // improve ui when no building information is provided
  if (!building || !user) return null;

  return (
    <Dialog.Root
      open={isEditModalOpen}
      onOpenChange={(open) => setIsEditModalOpen(open)}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="absolute inset-0 z-20 h-screen w-screen bg-black/30 data-[state=open]:animate-overlay-show" />
        <Dialog.Content className="absolute top-1/2 left-1/2 z-30 m-auto max-h-screen w-11/12 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-4 shadow-lg data-[state=open]:animate-content-show">
          <Dialog.Title className="flex w-full flex-row items-center justify-between font-mono text-base font-semibold text-black">
            <span className="flex-1 italic leading-tight">{building.name}</span>
            <Dialog.Close asChild>
              <button
                className="inline-flex appearance-none items-center justify-center rounded-full border-2 border-transparent p-2 text-black hover:bg-zinc-100 active:border-zinc-300"
                aria-label="Close"
              >
                <MdClose className="h-6 w-6" />
              </button>
            </Dialog.Close>
          </Dialog.Title>
          <Dialog.Description className="mt-2 font-mono text-sm">
            Află informații istorice sau culturale despre această{" "}
            <span>{building.BuildingTag.tag}</span>
          </Dialog.Description>
          <div className="relative mt-2 p-2">
            <Form
              onSubmit={(event) => {
                event.preventDefault();
                const form = new FormData(event.currentTarget);
                updateDescription.mutate(form);
              }}
            >
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <Avatar.Root className="mr-3 inline-flex h-9 w-9 select-none items-center justify-center overflow-hidden rounded-full bg-zinc-200 align-middle">
                    <Avatar.Image
                      className="h-full w-full rounded-full object-cover"
                      src={`http://localhost:3000/resources/${
                        user.picture?.imageKey || ""
                      }`}
                      alt={user.name}
                    />
                    <Avatar.Fallback className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-zinc-100 text-lg font-medium">
                      {user.name.slice(0, 2).toLocaleUpperCase()}
                    </Avatar.Fallback>
                  </Avatar.Root>

                  <textarea
                    rows={10}
                    required
                    name="description"
                    className="w-full flex-1 rounded-lg border-4 border-zinc-300 p-4 font-mono text-sm leading-tight outline-none "
                    defaultValue={building.description}
                  />
                </div>
                <div className="mt-2 flex flex-row items-center justify-end ">
                  <button
                    type="submit"
                    className="mr-4 rounded-lg bg-green-100 px-4 py-3 text-green-800 hover:bg-green-200"
                  >
                    Salvează schimbările
                  </button>
                  <button
                    onClick={() => {
                      setIsInfoModalOpen(true);
                      setIsEditModalOpen(false);
                    }}
                    className="rounded-lg bg-red-100 px-4 py-3 text-red-800 hover:bg-red-200"
                  >
                    Anulează
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default BuildingInformationModal;
