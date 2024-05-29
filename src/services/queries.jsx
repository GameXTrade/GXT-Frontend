import { useQueries, useQuery } from "@tanstack/react-query";
import { getAllItems, getRecentitems, getItemById } from "./api";
import { useEffect } from "react";

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
