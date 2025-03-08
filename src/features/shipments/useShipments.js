import {
  getShipment,
  getShipments,
  addShipment,
  updateShipment,
  deleteShipment,
  getPaginateShipments,
  multipleDeleteShipment,
} from "@/services/shipmentAPI";
import { useQuery } from "@tanstack/react-query";
import { useMutate } from "@/hooks/useMutate";

export function useShipments() {
  const { data, error, isPending } = useQuery({
    queryKey: ["shipments"],
    queryFn: getShipments,
  });
  return {
    shipments: data,
    error,
    isLoading: isPending,
  };
}

export function usePaginateShipments(page, limit) {
  const { data, error, isPending } = useQuery({
    queryKey: ["shipments", page, limit],
    queryFn: () => getPaginateShipments(page, limit),
  });
  return {
    shipments: data,
    error,
    isLoading: isPending,
  };
}
export function useShipment(id) {
  const { data, error, isPending } = useQuery({
    queryKey: ["shipments", id],
    queryFn: () => getShipment(id),
  });
  return {
    Shipment: data,
    error,
    isLoading: isPending,
  };
}

export const useAddShipment = () =>
  useMutate({
    queryKey: ["shipments", "add"],
    mutationFn: addShipment,
    loadingMessage: "Adding shipment...",
    successMessage: "shipment added successfully",
  });

export const useUpdateShipment = () =>
  useMutate({
    queryKey: ["shipments", "update"],
    mutationFn: updateShipment,
    loadingMessage: "Updating shipment...",
    successMessage: "shipment updated successfully",
  });

export const useDeleteShipment = () =>
  useMutate({
    queryKey: ["shipments", "delete"],
    mutationFn: deleteShipment,
    loadingMessage: "Deleting Shipment...",
    successMessage: "Shipment deleted successfully",
  });

export const useMultipleDeleteShipments = () =>
  useMutate({
    queryKey: ["shipments", "multiple", "delete"],
    mutationFn: multipleDeleteShipment,
    loadingMessage: "Deleting multiple shipments...",
    successMessage: "multiple shipments deleted successfully",
  });
