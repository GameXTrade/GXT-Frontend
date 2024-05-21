import { useMutation } from "@tanstack/react-query";
import { createItem } from "./api";

export function useCreateItem() {
  return useMutation({
    mutationFn: (data) => createItem(data),
    // these function below fires before mutationFn
    // that means you can read errors etc.
    onMutate: () => {
      console.log("mutate");
    },
    onError: () => {
      console.error("error");
    },
    onSuccess: () => {
      console.log("success");
    },
    onSettled: () => {
      console.log("sattled");
    },
  });
}
