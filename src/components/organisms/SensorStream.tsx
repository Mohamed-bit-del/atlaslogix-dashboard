import dayjs from "dayjs";
import { useStreamSensorData } from "../../hooks";
import { SkeletonSensorStream } from "../atoms";
import type { StreamSensorDataProps } from "../../types";


export default function SensorStream({ shipmentId }: StreamSensorDataProps) {
    const { data: sensorData, isLoading: isSensorLoading, error } = useStreamSensorData(shipmentId);

    // Check if we have valid sensor data 
    const hasSensorData = !!sensorData;

    return (
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-slate-200 p-6 min-h-[300px]">
            {isSensorLoading ? (
                <SkeletonSensorStream />
            ) : (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-slate-800">Stream Sensor Data</h2>
                    </div>

                    {hasSensorData ? (
                        <div className="space-y-4">
                            {/* Latest Sensor Reading */}
                            {(() => {
                                const latestData = sensorData;
                                return (
                                    <>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {/* Temperature */}
                                            {latestData.temperature !== undefined && (
                                                <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                        </svg>
                                                        <span className="text-xs font-medium text-orange-800">Temperature</span>
                                                    </div>
                                                    <div className="text-2xl font-bold text-orange-900">{latestData.temperature}°C</div>
                                                </div>
                                            )}

                                            {/* Humidity */}
                                            {latestData.humidity !== undefined && (
                                                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                                        </svg>
                                                        <span className="text-xs font-medium text-blue-800">Humidity</span>
                                                    </div>
                                                    <div className="text-2xl font-bold text-blue-900">{latestData.humidity}%</div>
                                                </div>
                                            )}

                                            {/* Pressure */}
                                            {latestData.pressure !== undefined && (
                                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                        </svg>
                                                        <span className="text-xs font-medium text-purple-800">Pressure</span>
                                                    </div>
                                                    <div className="text-2xl font-bold text-purple-900">{latestData.pressure} hPa</div>
                                                </div>
                                            )}

                                            {/* Battery */}
                                            {latestData.battery !== undefined && (
                                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                        </svg>
                                                        <span className="text-xs font-medium text-green-800">Battery</span>
                                                    </div>
                                                    <div className="text-2xl font-bold text-green-900">{latestData.battery}%</div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Additional Info Row */}
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                            {/* Vibration */}
                                            {latestData.vibration !== undefined && (
                                                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                                                    <span className="text-xs text-slate-500">Vibration</span>
                                                    <div className="text-lg font-semibold text-slate-900">{latestData.vibration} m/s²</div>
                                                </div>
                                            )}

                                            {/* Shock */}
                                            {latestData.shock !== undefined && (
                                                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                                                    <span className="text-xs text-slate-500">Shock</span>
                                                    <div className="text-lg font-semibold text-slate-900">{latestData.shock} g</div>
                                                </div>
                                            )}

                                            {/* Signal Strength */}
                                            {latestData.signal_strength !== undefined && (
                                                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                                                    <span className="text-xs text-slate-500">Signal Strength</span>
                                                    <div className="text-lg font-semibold text-slate-900">{latestData.signal_strength} dBm</div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Location */}
                                        {latestData.location && (
                                            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mt-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span className="text-sm font-medium text-slate-700">Location</span>
                                                </div>
                                                <div className="text-sm text-slate-600">
                                                    Lat: {latestData.location.latitude.toFixed(6)}, Lng: {latestData.location.longitude.toFixed(6)}
                                                </div>
                                            </div>
                                        )}

                                        {/* Timestamp */}
                                        <div className="text-xs text-slate-500 mt-4">
                                            Last updated: {dayjs(latestData.timestamp).format("MMMM D, YYYY [at] h:mm:ss A")}
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-slate-500">
                            {isSensorLoading ? (
                                <div className="flex flex-col items-center gap-3">
                                    <svg className="animate-spin h-8 w-8 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Loading sensor data...</span>
                                </div>
                            ) : error ? (
                                <div className="flex flex-col items-center gap-3">
                                    <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-red-600 font-medium">Error loading sensor data</p>
                                    <p className="text-sm text-slate-500">Please try again later</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-3">
                                    <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                    </svg>
                                    <p className="font-medium">No sensor data available</p>
                                    <p className="text-sm text-slate-500">No data found for this shipment</p>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
