import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  login,
  register,
  logout,
  oauth2Login,
  getUser,
} from "@/services/userAPI";
import { useConfirmationModal } from "./useConfModal";

const useRedirect = () => {
  const navigate = useNavigate();

  return (message) => {
    toast.success(message);
    navigate("/app");
  };
};

export function useLogin() {
  const redirect = useRedirect();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ username, password }) => login(username, password),
    onSuccess: (data) => {
      redirect(
        "Logged in successfully. You'll be redirected now.",
        data?.role || data?.data?.role
      );
      localStorage.setItem("token", data);
    },

    onError: (error) => toast.error(error.message),
  });

  return { login: mutate, isLogging: isPending, error };
}

export function useOAuth2Login() {
  const redirect = useRedirect();

  const { data, isPending, error } = useQuery({
    mutationKey: ["login"],
    mutationFn: (provider) => oauth2Login(provider),
    onSuccess: (data) =>
      redirect(
        "Logged in with OAuth2  successfully. You'll be redirected now.",
        console.log(data)
      ),
    onError: (error) => toast.error(error.message),
  });

  return { login: data, isLogging: isPending, error };
}

export function useRegister() {
  const redirect = useRedirect();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["register"],
    mutationFn: (user) => register(user),
    onSuccess: (data) => {
      redirect("Registered in successfully. You'll be redirected now.");
      localStorage.setItem("token", data);
    },
    onError: (error) => toast.error(error.message),
  });

  return { register: mutate, isRegistering: isPending, error };
}

export function useLogout() {
  const { mutate, isPending, error } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("token");
      location.assign("/");
    },
    onError: (error) => toast.error(error.message),
  });
  const { openModal } = useConfirmationModal();

  const logoutFn = () => {
    return openModal({
      message: "You are about to log out. Do you wish to proceed?",
      title: "Logout",
      confirmText: "Logout",
      onConfirm: mutate,
    });
  };

  return { logout: logoutFn, isLoggingOut: isPending, error };
}

export const formatUserData = (data) => {
  const { username, email, role, permissions } = data;
  return {
    username,
    email,
    role: role?.slice(5),
    permissions,
  };
};

export function useUser(reason) {
  const { data, error, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 1,
    enabled: localStorage.getItem("token") !== null || reason === "detect",
  });

  return {
    user: data
      ? {
          ...formatUserData(data),
        }
      : null,
    isLoading: isPending,
    error,
  };
}
