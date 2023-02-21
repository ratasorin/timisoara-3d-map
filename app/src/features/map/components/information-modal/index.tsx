import {
  buildingIdAtom,
  editModalOpenAtom,
  infoModalOpenAtom,
} from "./context";
import { useAtomValue } from "jotai";
import Info from "./components/info";
import Edit from "./components/edit";
import { useQuery } from "@tanstack/react-query";
import type { QueriedBuildings } from "~/routes/api/buildings/read/$";

type Building = QueriedBuildings[number];

const BuildingInformationModal = () => {
  const isInfoModalOpen = useAtomValue(infoModalOpenAtom);
  const isEditModalOpen = useAtomValue(editModalOpenAtom);
  const buildingId = useAtomValue(buildingIdAtom);

  const { data, error, isLoading } = useQuery<[Building]>(
    ["buildings", buildingId],
    async () => {
      const response = await fetch(`/api/buildings/read/${buildingId}`);
      const data = await response.json();
      return data;
    }
  );

  if (!buildingId || !data || error || isLoading) return null;

  const [building] = data;
  if (isEditModalOpen) return <Edit building={building} />;
  if (isInfoModalOpen) return <Info building={building} />;

  return null;
};

export default BuildingInformationModal;
