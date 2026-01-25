import { Table } from '../molecules';
import { useAuthContext } from '../../context/AuthContext';
import { useShipments } from '../../hooks';
import type { Shipment } from '../../types/shipment';
import { Badge, SkeletonRow } from '../atoms';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

function ShipmentsTable() {
    const { tenantId } = useAuthContext();
    const { data: shipments, isLoading, error } = useShipments(tenantId!);
    const navigate = useNavigate();

    if (error) return <div className="p-8 text-red-500">Error fetching shipments</div>;

    const handleRowClick = (shipmentId: string) => {
        navigate(`/shipments/${shipmentId}`);
    };

    return (
        <div className="container m-auto">
            <Table>
                <Table.header>
                    <th scope="col" className="px-6 py-4">Shipment ID</th>
                    <th scope="col" className="px-6 py-4">Status</th>
                    <th scope="col" className="px-6 py-4">Warehouse</th>
                    <th scope="col" className="px-6 py-4">Compliance</th>
                    <th scope="col" className="px-6 py-4">Last Updated</th>
                </Table.header>

                <Table.body>
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={5} />)
                    ) : !shipments || shipments.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-6 py-8 text-center text-slate-400 italic">No shipments found</td>
                        </tr>
                    ) : (
                        shipments.map((ele: Shipment) => (
                            <tr
                                key={ele.shipmentId}
                                className="hover:bg-slate-50 transition-colors cursor-pointer"
                                onClick={() => handleRowClick(ele.shipmentId)}
                            >
                                <th scope="row" className="px-6 py-4 text-sm font-medium text-slate-900">
                                    {ele.shipmentId}
                                </th>
                                <td>
                                    <Badge status={ele.status} variant={ele.status as any} />
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">{ele.warehouse || "-"}</td>
                                <td>
                                    <Badge status={ele.compliance_status} variant={ele.compliance_status as any} />
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">{dayjs(ele.last_updated).format("MMM D, YYYY, hh:mm A")}
                                </td>
                            </tr>
                        ))
                    )}
                </Table.body>
            </Table>
        </div>
    );
}

export default ShipmentsTable;