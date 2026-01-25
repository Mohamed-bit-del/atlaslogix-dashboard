import { useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useShipments } from "../hooks";
import { StatsCard } from "../components/molecules";
import { SkeletonCard } from "../components/atoms";
import { ShipmentsTable } from "../components/organisms";

export default function ShipmentsPage() {
    const { tenantId } = useAuthContext();
    const { data, isLoading, error } = useShipments(tenantId!);

    // enrichedData logic to mock missing fields
    const enrichedData = useMemo(() => {
        if (!data) return [];
        return data.map((shipment, index) => {
            // Deterministic mock data based on index
            const statuses = ["In transit", "processing", "In transit", "processing", "In transit", "processing", "delivered", "delivered"];
            const warehouses = ["Newark Distribution Center", "Los Angeles Hub", "Atlanta Regional", "Seattle Port", "Dallas Distribution", "Miami Port", "Phoenix Hub", "Chicago Warehouse"];
            const compliances = ["approved", "pending", "approved", "pending", "pending", "pending", "approved", "locked"];
            const variants = ["info", "warning", "info", "warning", "info", "warning", "success", "success"]; // Matches status colors
            const complianceVariants = ["success", "info", "success", "info", "info", "info", "success", "locked"];

            const i = index % statuses.length; // cycle if more shipments

            return {
                ...shipment,
                status: statuses[i] as any,
                warehouse: warehouses[i],
                compliance: compliances[i] as any,
                statusVariant: variants[i],
                complianceVariant: complianceVariants[i],
                formattedId: `SH-2024-${String(index + 1).padStart(4, "0")}`,
            };
        });
    }, [data]);

    // Calculate stats
    const stats = useMemo(() => {
        const total = enrichedData.length;
        const approved = enrichedData.filter((s) => s.compliance === "approved").length;
        const pending = enrichedData.filter((s) => s.compliance === "pending").length;
        const locked = enrichedData.filter((s) => s.compliance === "locked").length;
        return { total, approved, pending, locked };
    }, [enrichedData]);

    // if (isLoading) return <div className="p-8">Loading...</div>; // Handled by skeletons now
    if (error) return <div className="p-8 text-red-500">Error fetching shipments</div>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Shipments</h1>
                <span className="text-slate-500 font-medium">Acme Logistics Inc.</span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                ) : (
                    <>
                        <StatsCard title="Total Shipments" value={stats.total} />
                        <StatsCard title="Approved" value={stats.approved} valueColor="text-teal-500" />
                        <StatsCard title="Pending" value={stats.pending} valueColor="text-blue-500" />
                        <StatsCard title="Locked" value={stats.locked} valueColor="text-slate-800" />
                    </>
                )}
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <ShipmentsTable />
            </div>
        </div>
    );
}
