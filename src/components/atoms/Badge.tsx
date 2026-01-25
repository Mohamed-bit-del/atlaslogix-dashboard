import type { ShipmentBadgeProps } from "../../types";


export default function Badge({ status, variant }: ShipmentBadgeProps) {
    // Normalize variant to uppercase for lookup, handle any casing from backend
    const normalizedVariant = (variant || "").toUpperCase();

    const variants: Record<string, string> = {
        IN_TRANSIT: "bg-blue-600 text-white",
        AT_WAREHOUSE: "bg-slate-500 text-white",
        APPROVED: "bg-teal-500 text-white",
        LOCKED: "bg-slate-800 text-white",
    };

    const formatText = (text: string) => {
        if (!text) return "";
        return text.toLowerCase().replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
    };

    // Fallback color if variant not found
    const className = variants[normalizedVariant] || "bg-gray-100 text-gray-800";

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${className}`}
        >
            {formatText(status)}
        </span>
    );
}
