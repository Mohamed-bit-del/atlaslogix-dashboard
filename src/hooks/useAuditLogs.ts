import { useQuery } from "@tanstack/react-query";
import { getAuditLogs } from "../api/auditLogs";

export const useAuditLogs = (shipmentId: string) => {
    return useQuery({
        queryKey: ["audit-logs", shipmentId],
        queryFn: async () => {
            const { data } = await getAuditLogs(shipmentId);
            return data.data;
        },
        enabled: !!shipmentId,
    });
};
