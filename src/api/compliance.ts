import { api } from "./axios";

export const approveShipment = (id: string) =>
  api.post(`shipments/${id}/compliance/approve`);

export const getComplianceReport = (shipmentId: string) =>
  api.get(`shipments/${shipmentId}/compliance/report`);