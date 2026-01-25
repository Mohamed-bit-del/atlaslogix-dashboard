import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";
import type { LoginPayload } from "../types/auth";

export const useAuth = () => {
  const { login } = useAuthContext();

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onError: (err) => {
      console.error(err);
    },
  });
};
