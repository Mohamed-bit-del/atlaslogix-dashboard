export type Shipment = {
  shipmentId: string;
  tenantId: string;
  status: "IN_TRANSIT" | "AT_WAREHOUSE" | "APPROVED" | "locked";
  warehouse: string;
  approved_by: string;
  compliance_status: "APPROVED" | "IN_TRANSIT" | "AT_WAREHOUSE" | "locked";
  last_updated: string;
  locked_at: string;
};

export type EnrichedShipment = Shipment & {
  approvedBy: string; // Converted from approved_by
  updatedAt: string; // Converted from last_updated
  formattedId: string; // Formatted version of shipmentId
  statusVariant: "IN_TRANSIT" | "AT_WAREHOUSE" | "APPROVED" | "locked";
  complianceVariant: "IN_TRANSIT" | "AT_WAREHOUSE" | "APPROVED" | "locked";
};

