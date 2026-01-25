import { api } from "./axios";

export const getStreamSensorData = (shipmentId: string) =>
  api.get(`shipments/${shipmentId}/sensor-data`);

// Export URL for use in streaming hooks (fetch)
export const STREAM_SENSOR_DATA_URL = import.meta.env.VITE_STREAM_SENSOR_DATA_URL;