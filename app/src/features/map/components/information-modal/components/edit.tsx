import * as Dialog from "@radix-ui/react-dialog";
import { editModalOpenAtom, infoModalOpenAtom } from "../context";
import { useAtom, useSetAtom } from "jotai";
import { MdClose } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { Form } from "@remix-run/react";
import { queryClient } from "~/src/react-query";
import type { FunctionComponent } from "react";
import type { QueriedBuildings } from "~/routes/api/buildings/read/$";
import { useUser } from "~/src/hooks/user";
import Avatar from "~/src/components/avatar";

type Building = QueriedBuildings[number];

const BuildingInformationModal: FunctionComponent<{
  building: Building;
}> = ({ building }) => {
  const setIsInfoModalOpen = useSetAtom(infoModalOpenAtom);
  const [isEditModalOpen, setIsEditModalOpen] = useAtom(editModalOpenAtom);

  const { user } = useUser();

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
                  <Avatar
                    profilePictureKey={user.picture?.imageKey}
                    username={user.name}
                  />
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
                    className="mr-4 rounded-lg bg-green-100 px-3 py-2 text-green-800 hover:bg-green-200"
                  >
                    Salvează
                  </button>
                  <button
                    onClick={() => {
                      setIsInfoModalOpen(true);
                      setIsEditModalOpen(false);
                    }}
                    className="rounded-lg bg-red-100 px-3 py-2 text-red-800 hover:bg-red-200"
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
