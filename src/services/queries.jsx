import { useQueries, useQuery } from "@tanstack/react-query";
import { getAllItems, getRecentitems } from "./api";

export function useItems() {
  return useQuery({
    queryKey: ["items"],
    queryFn: getAllItems,
  });
}

export function useRecentItems() {
  return useQuery({
    queryKey: ["recent"],
    queryFn: getRecentitems,
  });
}

export function useItem(ids) {
  const queries = (ids ?? []).map((id) => ({
    queryKey: ["item", id],
    queryFn: () => getItemById(id),
    enabled: !!id, // Aktivieren der Abfrage nur, wenn die ID vorhanden ist
  }));

  return useQueries({ queries });
}
