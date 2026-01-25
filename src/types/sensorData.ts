export interface SensorData {
  timestamp: string;
  temperature?: number;
  humidity?: number;
  pressure?: number;
  location?: {
    latitude: number;
    longitude: number;
  };
  vibration?: number;
  shock?: number;
  battery?: number;
  signal_strength?: number;
}

// API returns a flat object with sensor data, not nested
export interface StreamSensorDataResponse extends SensorData {
  shipmentId: string;
  confidence?: string;
  status: "Excellent" | "Good" | "Fair" | "Poor"; // inferred from UI
}
