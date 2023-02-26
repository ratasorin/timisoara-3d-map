import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type { FunctionComponent } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";
import { AiFillRead } from "react-icons/ai";
import { getBuildingCoordinates } from "library/map/layers/buildings";
import { useSetAtom } from "jotai";
import { centerCoordinatesAtom } from "../../context/coordinates";
import {
  infoModalOpenAtom,
  buildingIdAtom,
} from "../../../information-modal/context";
import type { QueriedBuildings } from "~/routes/api/buildings/read/$";
import { Link } from "@remix-run/react";

type Building = QueriedBuildings[number];

const Header: FunctionComponent<{
  building: Building;
}> = ({ building }) => {
  const setCenterCoordinates = useSetAtom(centerCoordinatesAtom);
  const setInformationModalOpen = useSetAtom(infoModalOpenAtom);
  const setBuildingId = useSetAtom(buildingIdAtom);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex w-full flex-row items-center justify-between rounded-lg p-2 font-bold hover:bg-zinc-100">
          <span className="mx-4 flex-1 text-left">{building.name}</span>
          <MdArrowForwardIos className="text-xl" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="w-80 rounded-lg bg-white p-2 shadow-md will-change-[opacity,transform] data-[side=top]:animate-slide-down-and-fade data-[side=right]:animate-slide-left-and-fade data-[side=bottom]:animate-slide-up-and-fade data-[side=left]:animate-slide-right-and-fade">
          <DropdownMenu.Item
            onClick={async () => {
              const { x, y } = await getBuildingCoordinates(building.osmId);
              setCenterCoordinates({ x, y });
            }}
            className="flex flex-row items-center justify-between rounded-lg p-2 font-mono text-base font-medium hover:cursor-pointer hover:bg-zinc-100 hover:outline-none"
          >
            <span className="mx-4 flex-1">Vedeți pe mapă</span>
            <FaMapMarkerAlt className="h-6 w-6 text-blue-600" />
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onClick={() => {
              setInformationModalOpen(true);
              setBuildingId(building.id);
            }}
            className="flex flex-row items-center justify-between rounded-lg p-2 font-mono text-base font-medium hover:cursor-pointer hover:bg-zinc-100 hover:outline-none"
          >
            <span className="mx-4 flex-1">Aflați mai multe informații</span>
            <MdInfoOutline className="h-6 w-6 text-blue-600" />
          </DropdownMenu.Item>

          <DropdownMenu.Item className="flex flex-row items-center justify-between rounded-lg p-2 font-mono text-base font-medium hover:cursor-pointer hover:bg-zinc-100 hover:outline-none">
            <Link to="/blogs" className="mx-4 flex-1">
              Citiți bloguri
            </Link>
            <AiFillRead className="h-6 w-6 text-blue-600" />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Header;
