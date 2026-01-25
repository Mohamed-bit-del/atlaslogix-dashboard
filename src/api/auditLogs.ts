import { api } from "./axios";

export const getAuditLogs = (shipmentId: string) => 
    api.get<import("../types/auditLogs").AuditLogResponse>(`audit-logs?entity=shipment`, { params: { entityId: shipmentId } });