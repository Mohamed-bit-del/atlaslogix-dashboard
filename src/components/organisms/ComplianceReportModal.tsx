import { useCompliance } from "../../hooks";
import { Modal } from "../molecules";
import { Icon } from "../atoms";
import dayjs from "dayjs";

interface ComplianceReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    shipmentId: string;
}

export default function ComplianceReportModal({ isOpen, onClose, shipmentId }: ComplianceReportModalProps) {
    const { data: report, isLoading, isError } = useCompliance(shipmentId, { enabled: isOpen });

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Compliance Report" maxWidth="max-w-4xl">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="mt-6 text-slate-600 font-medium">Loading report...</p>
                </div>
            ) : isError ? (
                <div className="flex flex-col items-center justify-center py-24">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                        <Icon name="AlertTriangle" className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Failed to Load Report</h3>
                    <p className="text-slate-500 text-sm">Please try again later</p>
                </div>
            ) : report ? (
                <div className="space-y-6">
                    {/* Header with Report Details */}
                    {/* <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <FileText className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900">Report Details</h3>
                    </div> */}

                    {/* Status and Date Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                        {/* Generated Date */}
                        <div className="bg-white border border-slate-200 rounded-lg p-5">
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                                Generated
                            </p>
                            <p className="text-lg font-semibold text-slate-900">
                                {dayjs(report.generatedAt).format("MMMM D, YYYY")}
                            </p>
                            <p className="text-sm text-slate-600 mt-1">
                                {dayjs(report.generatedAt).format("h:mm A")}
                            </p>
                        </div>
                    </div>

                    {/* Report Data Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
                        {Object.entries(report)
                            .filter(([key]) => !['status', 'generatedAt', 'id', 'shipmentId'].includes(key))
                            .map(([key, value]) => (
                                <div
                                    key={key}
                                    className="bg-white border border-slate-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                                >
                                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </h4>
                                    </div>

                                    <div className="space-y-3">
                                        {typeof value === 'object' && value !== null ? (
                                            Object.entries(value).map(([subKey, subValue]: [string, any]) => (
                                                <div key={subKey} className="flex justify-between items-start gap-4">
                                                    <span className="text-sm text-slate-500 capitalize flex-shrink-0">
                                                        {subKey.replace(/[_]/g, ' ')}
                                                    </span>
                                                    <span className="text-sm font-medium text-slate-900 text-right">
                                                        {typeof subValue === 'object'
                                                            ? JSON.stringify(subValue)
                                                            : String(subValue)}
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-base font-medium text-slate-900">{String(value)}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            ) : null}
        </Modal>
    );
}
