import { useState } from "react";
import { useApproveShipment, useAuditLogs } from "../../hooks";
import ComplianceReportModal from "./ComplianceReportModal";
import SensorStream from "./SensorStream";
import AuditLogList from "./AuditLogList";
import { Badge } from "../atoms";

import dayjs from "dayjs";
import type { Shipment } from "../../types/shipment";

export interface ShipmentDetailsProps {
    shipment: Shipment;
    onBack: () => void;
}

export default function ShipmentDetails({ shipment, onBack }: ShipmentDetailsProps) {
    const { mutate: approve, isPending } = useApproveShipment();
    const { data: auditLogs, isLoading: isLoadingLogs } = useAuditLogs(shipment.shipmentId);
    const [isReportOpen, setIsReportOpen] = useState(false);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Shipments</h1>
                <span className="text-slate-500 font-medium">Acme Logistics Inc.</span>
            </div>

            {/* Back Button */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-6"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Shipments
            </button>

            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-6">Shipment Summary</h2>

                <div className="space-y-4">
                    {/* Shipment ID */}
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                        <span className="text-sm text-slate-500">Shipment ID</span>
                        <span className="text-sm font-medium text-slate-900">{shipment.shipmentId}</span>
                    </div>

                    {/* Warehouse */}
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                        <span className="text-sm text-slate-500">Warehouse</span>
                        <span className="text-sm font-medium text-slate-900">{shipment.warehouse}</span>
                    </div>

                    {/* Status */}
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                        <span className="text-sm text-slate-500">Status</span>
                        <Badge status={shipment.status} variant={shipment.status as any} />
                    </div>

                    {/* Compliance Status */}
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                        <span className="text-sm text-slate-500">Compliance Status</span>
                        <Badge status={shipment.compliance_status} variant={shipment.compliance_status as any} />
                    </div>

                    {/* Approved By */}
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                        <span className="text-sm text-slate-500">Approved By</span>
                        <span className="text-sm font-medium text-slate-900">{shipment.approved_by}</span>
                    </div>

                    {/* Last Updated */}
                    <div className="flex justify-between items-center py-3">
                        <span className="text-sm text-slate-500">Last Updated</span>
                        <span className="text-sm font-medium text-slate-900">
                            {dayjs(shipment.last_updated).format("MMMM D, YYYY [at] h:mm A")}
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <SensorStream shipmentId={shipment.shipmentId} />

                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-semibold text-slate-800 mb-4">Actions</h2>

                        {/* Compliance Notification */}
                        {shipment.compliance_status === "APPROVED" ? (
                            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 flex items-start gap-3">
                                <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <div className="text-sm text-teal-700">
                                    <span className="font-medium">Compliance approved by {shipment.approved_by}</span>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => approve(shipment.shipmentId)}
                                disabled={isPending}
                                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-4 py-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPending ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                                {isPending ? "Approving..." : "Approve Shipment"}
                            </button>
                        )}
                        <button
                            onClick={() => setIsReportOpen(true)}
                            className="w-full flex items-center justify-center gap-2 mt-3 bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            View Compliance Report
                        </button>
                    </div>
                </div>
            </div>

            <AuditLogList logs={auditLogs || []} isLoading={isLoadingLogs} />

            <ComplianceReportModal
                isOpen={isReportOpen}
                onClose={() => setIsReportOpen(false)}
                shipmentId={shipment.shipmentId}
            />
        </div>
    );
}
