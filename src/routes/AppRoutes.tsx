import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login";
import DashboardLayout from "../components/templates/DashboardLayout";
// import Dashboard from "../pages/dashboard";
import ShipmentsPage from "../pages/Shipments";
import ShipmentDetailsPage from "../pages/shipments/[id]";
import SensorDataPage from "../pages/SensorData";

function AppRouts() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Dashboard Routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/shipments" element={<ShipmentsPage />} />
        <Route path="/shipments/:id" element={<ShipmentDetailsPage />} />
        <Route path="/sensor-data" element={<SensorDataPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRouts;
