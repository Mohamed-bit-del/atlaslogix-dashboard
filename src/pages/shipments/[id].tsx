import { useParams, useNavigate } from "react-router-dom";
import { ShipmentDetails } from "../../components/organisms";
import { useShipment } from "../../hooks";
import { SkeletonDetails } from "../../components/atoms";

export default function ShipmentDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: shipment, isLoading, error } = useShipment(id!);

    if (isLoading) return <SkeletonDetails />;
    if (error) return <div className="p-8 text-red-500">Error fetching shipment details</div>;
    if (!shipment) return <div className="p-8">Shipment not found</div>;

    return <ShipmentDetails shipment={shipment} onBack={() => navigate("/shipments")} />;
}
