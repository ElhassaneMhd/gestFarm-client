import { useMutate } from "@/hooks/useMutate";
import { useQuery } from "@tanstack/react-query";
import { getSales } from "@/services/saleAPI";
import {
  addSale,
  getSale,
  multipleDeleteSale,
  deleteSale,
  updateSale,
  getPaginateSales,
} from "../../services/saleAPI";

export function useSales() {
  const { data, error, isPending } = useQuery({
    queryKey: ["sales"],
    queryFn: getSales,
  });
  return {
    sales: data,
    error,
    isLoading: isPending,
  };
}
export function usePaginateSales(page, limit) {
  const { data, error, isPending } = useQuery({
    queryKey: ["sales",page,limit],
    queryFn: () => getPaginateSales(page, limit),
  });
  return {
    sales: data,
    error,
    isLoading: isPending,
  };
}

export function useSale(id) {
  const { data, error, isPending } = useQuery({
    queryKey: ["sales", id],
    queryFn: () => getSale(id),
  });
  return {
    sale: data,
    error,
    isLoading: isPending,
  };
}

export const useAddSale = () =>
  useMutate({
    queryKey: ["sales", "add"],
    mutationFn: addSale,
    loadingMessage: "Adding Sale...",
    successMessage: "Sale added successfully",
  });

export const useUpdateSale = () =>
  useMutate({
    queryKey: ["sales", "update"],
    mutationFn: updateSale,
    loadingMessage: "Updating Sale...",
    successMessage: "Sale updated",
  });

export const useDeleteSale = () =>
  useMutate({
    queryKey: ["sales", "delete"],
    mutationFn: deleteSale,
    loadingMessage: "Deleting Sale...",
    successMessage: "Sale deleted",
  });

export const useMultipleDeleteSale = () =>
  useMutate({
    queryKey: ["sales", "deleteAll"],
    mutationFn: multipleDeleteSale,
    loadingMessage: "Deleting Sale...",
    successMessage: "Sale deleted",
  });
