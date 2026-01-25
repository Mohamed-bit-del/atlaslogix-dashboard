import { useQuery } from "@tanstack/react-query";
import { getShipments, getShipment } from "../api/shipments";
import type { Shipment } from "../types/shipment";

export const useShipments = (tenantId: string) =>
  useQuery<Shipment[], Error>({
    queryKey: ["shipments", tenantId],
    queryFn: async () => {
      const response = await getShipments(tenantId);
      const data = response.data as Shipment[] | { results: Shipment[] };
      return Array.isArray(data) ? data : data.results || [];
    },
    enabled: !!tenantId,
  });

export const useShipment = (shipmentId: string) =>
  useQuery<Shipment, Error>({
    queryKey: ["shipment", shipmentId],
    queryFn: async () => {
        const response = await getShipment(shipmentId);
        return response.data;
    },
    enabled: !!shipmentId,
  });
