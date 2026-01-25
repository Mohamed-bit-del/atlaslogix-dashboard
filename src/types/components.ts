import type { LucideProps } from "lucide-react";


// Icon Component Types
export const iconRegistry = {
  Box: "Box",
  Activity: "Activity",
  X: "X",
  AlertTriangle: "AlertTriangle",
  FileText: "FileText",
  LayoutDashboard: "LayoutDashboard"
} as const;

export type IconName = "Box" | "Activity" | "X" | "AlertTriangle" | "FileText" | "LayoutDashboard";

export interface IconProps extends LucideProps {
  name: IconName;
}

// Button Component Types
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  loading?: boolean;
}

// Input Component Types
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

// Badge Component Types
export interface ShipmentBadgeProps {
  status: string;
  variant: "IN_TRANSIT" | "AT_WAREHOUSE" | "APPROVED" | "locked";
}

// Modal Component Types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

// Stats Card Component Types
export interface StatsCardProps {
  title: string;
  value: string | number;
  valueColor?: string;
  description?: string;
}

// Skeleton Component Types
export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

export interface SkeletonRowProps {
  cols: number;
}


// Sensor Stream Component Types
export interface StreamSensorDataProps {
  shipmentId: string;
}

// Shipment Details Component Types
export interface ShipmentDetailsProps {
  shipment: any; // Using any to avoid circular dependency
  onBack: () => void;
}

// Shipment List Component Types
export interface ShipmentListProps {
  tenantId: string;
}

// Table Compound Component Types
export interface TableCompoundProps {
  children: React.ReactNode;
}


// Audit Log Component Types
export interface AuditLogListProps {
  tenantId: string;
}

// Compliance Report Modal Component Types
export interface ComplianceReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipmentId: string;
}
