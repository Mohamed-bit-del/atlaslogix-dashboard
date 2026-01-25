export interface AuditLog {
    entity: string;
    entity_id: string;
    field: string;
    before: string | null;
    after: string | null;
    changed_by: string;
    timestamp: string;
}

export interface AuditLogResponse {
    data: AuditLog[];
}
