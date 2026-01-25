import { useGlobalSensorStream } from "../hooks";
import dayjs from "dayjs";
import { Table } from "../components/molecules";
import { SkeletonRow } from "../components/atoms";

export default function SensorDataPage() {
    const { data } = useGlobalSensorStream();
    console.log(data);

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Live Sensor Stream</h1>
                    <p className="text-slate-500 mt-1">Real-time sensor data feed</p>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <Table.header>
                            <th className="px-6 py-4 whitespace-nowrap">Timestamp</th>
                            <th className="px-6 py-4 whitespace-nowrap">Temperature</th>
                            <th className="px-6 py-4 whitespace-nowrap">Humidity</th>
                            <th className="px-6 py-4 whitespace-nowrap">Confidence</th>
                        </Table.header>
                        <Table.body>
                            {data.length === 0 ? (
                                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={4} />)
                            ) : (
                                data.map((row, index) => (
                                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 text-slate-600 font-mono">
                                            {dayjs(row.timestamp).format("h:mm:ss A")}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-800">
                                            {row.temperature ? `${row.temperature}°C` : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {row.humidity ? `${row.humidity}%` : "N/A"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${row.confidence === "HIGH" ? "bg-green-100 text-green-700" :
                                                row.confidence === "MEDIUM" ? "bg-amber-100 text-amber-700" :
                                                    "bg-red-100 text-red-700"
                                                }`}>
                                                {row.confidence || "Unknown"}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </Table.body>
                    </Table>
                </div>
            </div>

            {/* Footer / Status Indicator */}
            <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Live • {data.length} entries
            </div>
        </div>
    );
}
