import type { AuditLog } from "../../types/auditLogs";
import dayjs from "dayjs";

interface AuditLogListProps {
    logs: AuditLog[];
    isLoading: boolean;
}

export default function AuditLogList({ logs, isLoading }: AuditLogListProps) {
    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 opacity-60">
                <div className="h-4 bg-slate-200 rounded w-1/4 mb-4 animate-pulse" />
                <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-4">
                            <div className="w-2 h-full bg-slate-100 rounded animate-pulse" />
                            <div className="flex-1 h-24 bg-slate-100 rounded animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!logs?.length) {
        return null;
    }

    // Helper to generate a human-readable title from the field name
    const getTitle = (field: string) => {
        return field
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ') + " Updated";
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-8">Audit Log Timeline</h2>
            <div className="relative border-l-2 border-slate-100 ml-3 space-y-8">
                {logs.map((log, index) => (
                    <div key={index} className="relative pl-8">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm" />

                        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-base font-bold text-slate-900">
                                    {log.field === 'compliance_status' ? 'Compliance Approved' : getTitle(log.field)}
                                </h3>
                                <span className="text-sm text-slate-500">
                                    {dayjs(log.timestamp).format("MMM D, YYYY, h:mm A")}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 gap-2 mb-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Field: {log.field}</span>
                                </div>
                                <div className="flex items-center gap-3 mt-2">
                                    {log.before && (
                                        <span className="px-2 py-1 rounded-md bg-red-50 text-red-700 text-sm font-medium border border-red-100">
                                            {log.before}
                                        </span>
                                    )}
                                    <span className="text-slate-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                    {log.after && (
                                        <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-100">
                                            {log.after}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="text-sm text-slate-500 pt-4 border-t border-slate-50">
                                Changed by: <span className="font-medium text-slate-900">{log.changed_by}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
