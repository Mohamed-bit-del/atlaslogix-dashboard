import { useQuery } from "@tanstack/react-query";
import { getStreamSensorData, STREAM_SENSOR_DATA_URL } from "../api/streams";
import { useState, useRef, useEffect } from "react";
import type { StreamSensorDataResponse } from "../types/sensorData";

export const useStreamSensorData = (shipmentId: string) => {
    return useQuery({
        queryKey: ["sensor-stream", shipmentId],
        queryFn: async () => {
            const response = await getStreamSensorData(shipmentId);
            return response.data;
        },
        refetchInterval: 5000,
        enabled: !!shipmentId,
        refetchOnWindowFocus: false,
    });
};

export const useGlobalSensorStream = () => {
    const [history, setHistory] = useState<StreamSensorDataResponse[]>([]);
    const abortRef = useRef<AbortController | null>(null);

    // Auto-connect on mount
    useEffect(() => {
        const controller = new AbortController();
        abortRef.current = controller;
        
        const fetchData = async () => {
            // Get token manually
            const stored = localStorage.getItem("atlaslogix_auth");
            let token = "";
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    token = parsed.token;
                } catch (e) {
                    console.error("Failed to parse auth token", e);
                }
            }

            try {
                // Use fetch to support streaming, but mimic Axios headers/behavior
                // Removing explicit Accept: text/event-stream as it causes 406 on some servers
                const response = await fetch(STREAM_SENSOR_DATA_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    signal: controller.signal,
                });

                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(`Stream error ${response.status}: ${text}`);
                }
                
                if (!response.body) throw new Error("No response body");

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let buffer = ""; // Buffer to hold partial chunks

                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    
                    buffer += chunk;
                    const lines = buffer.split("\n");
                    
                    // Keep the last part in buffer as it might be incomplete
                    buffer = lines.pop() || "";

                    for (const line of lines) {
                        const trimmed = line.trim();
                        if (!trimmed) continue;
                        
                        // Parse logic: handle both "data:" prefix and raw JSON
                        let jsonStr = trimmed;
                        if (trimmed.startsWith("data:")) {
                            jsonStr = trimmed.replace("data:", "").trim();
                        }

                        if (jsonStr) {
                            try {
                                const newData: StreamSensorDataResponse = JSON.parse(jsonStr);
                                setHistory(prev => {
                                    // Prepend new data, keep last 50
                                    const updated = [newData, ...prev];
                                    return updated.slice(0, 50);
                                });
                            } catch (e) {
                                // console.debug("Skipping non-JSON chunk line"); 
                            }
                        }
                    }
                }
            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    console.error("Global stream error:", error);
                }
            } finally {
                if (abortRef.current === controller) {
                    abortRef.current = null;
                }
            }
        };

        fetchData();

        // Cleanup
        return () => {
            if (abortRef.current) {
                abortRef.current.abort();
                abortRef.current = null;
            }
        };
    }, []);

    return { 
        data: history
    };
};
