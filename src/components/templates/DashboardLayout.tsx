import { Outlet } from "react-router-dom";
import { Sidebar } from "../organisms";

export default function DashboardLayout() {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Fixed Sidebar */}
            <aside className="w-64 h-full flex-shrink-0 border-r border-slate-200 bg-white">
                <Sidebar />
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 h-full overflow-y-auto p-8 relative">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
