import { useQuery } from "@tanstack/react-query";
import type { QueriedUser } from "~/routes/api/users/read/current";

export const useUser = () => {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<QueriedUser>(["user"], () =>
    fetch("/api/users/read/current").then((r) => r.json())
  );

  return { user, error, isLoading };
};
