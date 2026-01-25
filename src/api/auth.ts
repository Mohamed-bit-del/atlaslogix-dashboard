import { api } from "./axios";

export const login = (payload: { email: string; password: string }) =>
  api.post("auth/login", payload);