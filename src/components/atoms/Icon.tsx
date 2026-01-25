import { Box, Activity, X, AlertTriangle, FileText, LayoutDashboard } from "lucide-react";
import type { IconProps, IconName } from "../../types";
export type { IconName };


export const iconRegistry = {
    Box,
    Activity,
    X,
    AlertTriangle,
    FileText,
    LayoutDashboard
};


export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
    const LucideIcon = iconRegistry[name];

    if (!LucideIcon) {
        console.warn(`Icon "${name}" not found in registry.`);
        return null;
    }

    return <LucideIcon {...props} />;
};

export default Icon;
