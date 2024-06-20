import { useQueries, useQuery } from "@tanstack/react-query";
import {
  getAllItems,
  getItemById,
  getRecentItems,
  getNotableItems,
  getMostDownloadedItemsInDay,
} from "./api";
import { useEffect } from "react";

export function useItems() {
  return useQuery({
    queryKey: ["items"],
    queryFn: getAllItems,
  });
}
export function useNotableItems() {
  return useQuery({
    queryKey: ["notables"],
    queryFn: getNotableItems,
  });
}

export function useRecentItems() {
  return useQuery({
    queryKey: ["recent"],
    queryFn: getRecentItems,
  });
}
export function useMostDownloadedInDayItems() {
  return useQuery({
    queryKey: ["downloaded"],
    queryFn: getMostDownloadedItemsInDay,
  });
}

export function useItem(itemid) {
  const query = useQuery({
    queryKey: ["item", itemid],
    queryFn: () => getItemById(itemid),
    enabled: false,
  });

  useEffect(() => {
    query.refetch(); // Trigger initial data fetch
  }, []); // Run once on component mount

  return query;
}
