import { useNavigate, useLocation } from "react-router-dom";
import { Icon } from "../atoms";
import type { IconName } from "../atoms";

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems: { name: string; icon: IconName; path: string }[] = [
        { name: "Shipments", icon: "Box", path: "/shipments" },
        { name: "Sensor Data", icon: "Activity", path: "/sensor-data" },
    ];

    return (
        <div className="w-full h-full bg-white border-r border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                <img src="/atlaslogix-logo.svg" alt="AtlasLogix Logo" className="w-full h-full object-contain" />
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(`${item.path}/`));
                    return (
                        <button
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                ? "bg-blue-600 text-white shadow-sm"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <Icon name={item.icon} className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-500"}`} />
                            {item.name}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}
