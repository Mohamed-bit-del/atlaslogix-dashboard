// Re-export all types from individual modules
export * from "./auth";
export * from "./shipment";
export * from "./sensorData";
export * from "./auditLogs";
export * from "./components";

// Context Types
export interface AuthContextType {
  token: string | null;
  role: string | null;
  tenantId: string | null;
  userId: string | null;
  login: (payload: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
