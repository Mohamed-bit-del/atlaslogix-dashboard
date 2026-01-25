import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getComplianceReport, approveShipment } from "../api/compliance";

export const useCompliance = (shipmentId: string, options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ["compliance", shipmentId],
        queryFn: async () => {
            const response = await getComplianceReport(shipmentId);
            return response.data;
        },
        enabled: !!shipmentId && (options?.enabled ?? true),
    });
};

export const useApproveShipment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (shipmentId: string) => approveShipment(shipmentId),
        onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["shipments"] });
        },
    });
};
