import type { SkeletonProps, SkeletonRowProps } from "../../types";

export default function Skeleton({ width, height, className = "" }: SkeletonProps) {
    const style = {
        width: width,
        height: height,
    };

    return (
        <div
            className={`bg-slate-200 animate-pulse rounded ${className}`}
            style={style}
        />
    );
}

export function SkeletonRow({ cols }: SkeletonRowProps) {
    return (
        <tr>
            {Array.from({ length: cols }).map((_, i) => (
                <td key={i} className="px-6 py-4">
                    <Skeleton width="100%" height={20} />
                </td>
            ))}
        </tr>
    );
}

export function SkeletonCard() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <Skeleton width={100} height={16} className="mb-4" />
            <Skeleton width={60} height={32} />
        </div>
    );
}

export function SkeletonDetails() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center mb-6">
                <Skeleton width={200} height={32} />
                <Skeleton width={120} height={24} />
            </div>

            {/* Back Button Skeleton */}
            <Skeleton width={140} height={20} className="mb-6" />

            {/* Summary Card Skeleton (2 cols wide effectively) */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <Skeleton width={180} height={24} className="mb-6" />
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
                            <Skeleton width={100} height={16} />
                            <Skeleton width={140} height={16} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sensor Stream Skeleton (col-span-2) */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <Skeleton width={160} height={24} />
                    </div>
                    {/* Fake Sensor Data Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-4 h-24">
                                <Skeleton width="60%" height={16} className="mb-2" />
                                <Skeleton width="80%" height={24} />
                            </div>
                        ))}
                    </div>
                    {/* Fake Chart or List */}
                    <div className="mt-4 space-y-2">
                        <Skeleton width="100%" height={40} />
                        <Skeleton width="100%" height={40} />
                    </div>
                </div>

                {/* Actions Panel Skeleton (col-span-1) */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
                        <Skeleton width={100} height={24} className="mb-2" />
                        <Skeleton width="100%" height={48} className="rounded-lg" />
                        <Skeleton width="100%" height={48} className="rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function SkeletonSensorStream() {
    return (
        <div className="animate-pulse">
            <div className="flex justify-between items-center mb-6">
                <Skeleton width={160} height={24} />
            </div>
            {/* Fake Sensor Data Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-4 h-24">
                        <Skeleton width="60%" height={16} className="mb-2" />
                        <Skeleton width="80%" height={24} />
                    </div>
                ))}
            </div>
            {/* Fake Additional Info */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-3 h-16">
                        <Skeleton width="50%" height={12} className="mb-2" />
                        <Skeleton width="70%" height={20} />
                    </div>
                ))}
            </div>
            {/* Fake Location */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mt-4 h-20">
                <Skeleton width={100} height={16} className="mb-2" />
                <Skeleton width={200} height={16} />
            </div>
        </div>
    );
}
