import { useQuery } from "@tanstack/react-query";
import { useMutate } from "@/hooks/useMutate";
import {
  getAllUsers,
  getShippers,
  getPaginateUsers,
  getUserById,
  addUser,
  deleteUser,
  multipleDeleteUsers,
  updateUser,
} from "@/services/UserAPI";

export function useUsers() {
  const { data, error, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  if (!data) return { users: [], error, isLoading: isPending };
  return {
    users: data,
    error,
    isLoading: isPending,
  };
}
export function usePaginateUsers(page, limit) {
  const { data, error, isPending } = useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => getPaginateUsers(page, limit),
  });
  return {
    users: data,
    error,
    isLoading: isPending,
  };
}

export function useUser(id) {
  const { data, error, isPending } = useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
  });
  return {
    user: data,
    error,
    isLoading: isPending,
  };
}

export function useShippers() {
  const { data, error, isPending } = useQuery({
    queryKey: ["shippers"],
    queryFn: getShippers,
  });
  if (!data) return { shippers: [], error, isLoading: isPending };
  return {
    shippers: data,
    error,
    isLoading: isPending,
  };
}

export const useAddUser = () =>
  useMutate({
    queryKey: ["users", "add"],
    mutationFn: addUser,
    loadingMessage: "Adding user...",
    successMessage: "user added successfully",
  });

export const useUpdateUser = () =>
  useMutate({
    queryKey: ["users", "update"],
    mutationFn: updateUser,
    loadingMessage: "Updating user...",
    successMessage: "user updated successfully",
  });

export const useDeleteUser = () =>
  useMutate({
    queryKey: ["users", "delete"],
    mutationFn: deleteUser,
    loadingMessage: "Deleting User...",
    successMessage: "User deleted successfully",
  });

export const useMultipleDeleteUsers = () =>
  useMutate({
    queryKey: ["users", "delete"],
    mutationFn: multipleDeleteUsers,
    loadingMessage: "Deleting multiple users...",
    successMessage: "multiple users deleted successfully",
  });
