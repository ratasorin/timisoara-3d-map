import * as Dialog from "@radix-ui/react-dialog";
import { editModalOpenAtom, infoModalOpenAtom } from "../context";
import { useAtom, useSetAtom } from "jotai";
import { MdClose } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import type { QueriedUser } from "~/routes/api/users/read/current";
import * as Avatar from "@radix-ui/react-avatar";
import { useLocation, useNavigate } from "@remix-run/react";
import type { FunctionComponent } from "react";
import type { QueriedBuildings } from "~/routes/api/buildings/read/$";

type Building = QueriedBuildings[number];

const BuildingInformationModal: FunctionComponent<{
  building: Building;
}> = ({ building }) => {
  const setIsEditModalOpen = useSetAtom(editModalOpenAtom);
  const [isInfoModalOpen, setIsInfoModalOpen] = useAtom(infoModalOpenAtom);

  const { data: user } = useQuery<QueriedUser>(["user"], () =>
    fetch("/api/users/read/current").then((r) => r.json())
  );

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Dialog.Root
      open={isInfoModalOpen}
      onOpenChange={(open) => setIsInfoModalOpen(open)}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="absolute inset-0 z-20 h-screen w-screen bg-black/30 data-[state=open]:animate-overlay-show" />
        <Dialog.Content className="absolute top-1/2 left-1/2 z-30 m-auto max-h-screen w-11/12 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-4 shadow-lg data-[state=open]:animate-content-show">
          <Dialog.Title className="flex w-full flex-row items-center justify-between font-mono text-base font-semibold text-black">
            <span className="flex-1 italic leading-tight">{building.name}</span>
            <Dialog.Close asChild>
              <button
                className="inline-flex appearance-none items-center justify-center rounded-full border-2 border-transparent p-2 text-black hover:bg-zinc-100"
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
            <div>
              <div className="relative rounded-lg border-4 border-zinc-100 bg-zinc-50 p-4 font-mono leading-none">
                <i className="text-sm">{building.description}</i>
                <br />

                <div className="mt-2 ml-2 flex w-auto flex-row items-center">
                  <Avatar.Root className="inline-flex h-9 w-9 select-none items-center justify-center overflow-hidden rounded-full bg-black align-middle">
                    <Avatar.Image
                      className="h-full w-full rounded-full object-cover"
                      src={`http://localhost:3000/resources/${
                        building.author.picture?.imageKey || ""
                      }`}
                      alt={building.author.name}
                    />
                    <Avatar.Fallback className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-lg font-medium">
                      {building.author.name.slice(0, 2).toLocaleUpperCase()}
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <b className="ml-2 text-sm">{building.author.name}</b>
                </div>
              </div>
              <div className="mt-2 flex w-full flex-col items-end justify-end">
                <button
                  onClick={() => {
                    setIsInfoModalOpen(false);
                    setIsEditModalOpen(true);
                  }}
                  className="rounded-lg px-4 py-3 font-mono text-sm hover:bg-zinc-100 disabled:bg-zinc-300 disabled:text-zinc-700 disabled:hover:cursor-pointer"
                  disabled={!user}
                >
                  Editează informațiile
                </button>
                {!user && (
                  <button
                    onClick={() => {
                      const redirectBackTo = new URLSearchParams();
                      redirectBackTo.set(
                        "redirect-back-to",
                        location.pathname + location.search
                      );
                      navigate({
                        pathname: "/auth",
                        search: redirectBackTo.toString(),
                      });
                    }}
                    type="button"
                    className="rounded-lg px-4 py-3 font-mono text-sm hover:bg-zinc-100"
                  >
                    Loghează-te
                  </button>
                )}
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default BuildingInformationModal;
