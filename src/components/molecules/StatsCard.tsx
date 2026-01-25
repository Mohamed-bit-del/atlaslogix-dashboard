import type { StatsCardProps } from "../../types";


export default function StatsCard({ title, value, valueColor = "text-slate-900", description }: StatsCardProps) {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-32">
            <h3 className="text-sm font-medium text-slate-500">{title}</h3>
            <div className="mt-2">
                <span className={`text-3xl font-bold ${valueColor}`}>{value}</span>
                {description && <p className="text-xs text-slate-400 mt-1">{description}</p>}
            </div>
        </div>
    );
}
