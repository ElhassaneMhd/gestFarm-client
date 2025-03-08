import { useQuery } from "@tanstack/react-query";

import { useMutate } from "@/hooks/useMutate";
import {
  getPaginateRoles,
  addRole,
  getPermissions,
  updateRole,
} from "@/services/roleAPI";

export function usePaginateRoles(page, limit) {
  const { data, error, isPending } = useQuery({
    queryKey: ["roles", page, limit],
    queryFn: () => getPaginateRoles(page, limit),
  });
  return {
    roles: data,
    error,
    isLoading: isPending,
  };
}

export function usePermissions() {
  const { data, error, isPending } = useQuery({
    queryKey: ["permissions", "all"],
    queryFn: getPermissions,
  });
  return {
    permissions: data,
    error,
    isLoading: isPending,
  };
}

export const useAddRole = () =>
  useMutate({
    queryKey: ["roles", "add"],
    mutationFn: addRole,
    loadingMessage: "Adding role...",
    successMessage: "Role added successfully",
  });
export const useUpdateRole = () =>
  useMutate({
    queryKey: ["roles", "update"],
    mutationFn: updateRole,
    loadingMessage: "Updating role...",
    successMessage: "Role updated successfully",
  });
