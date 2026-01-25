export type AuthState = {
  token: string | null;
  role: string | null;
  tenantId: string | null;
  userId: string | null;
};

export type LoginPayload = {
  email: string;
  password: string;
};
