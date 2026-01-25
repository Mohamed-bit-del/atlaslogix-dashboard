import type { Shipment } from "../types/shipment";
import { api } from "./axios";

export const getShipments = (tenantId: string) =>
  api.get<Shipment[]>(`tenants/${tenantId}/shipments`);

export const getShipment = (shipmentId: string) =>
  api.get<Shipment>(`shipments/${shipmentId}`);