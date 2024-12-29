import React from "react";
import { LayoutDashboard, GraduationCap, Settings } from "lucide-react";

function Sider() {
    return (
        <aside className="w-64 bg-indigo-900 text-white min-h-screen">
            <div className="p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-wider text-center">
                        ADMIN PANEL
                    </h1>
                    <div className="mt-2 h-1 w-16 bg-indigo-500 mx-auto rounded-full"/>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                    <ul className="space-y-1">
                        <li>
                            <a
                                href="/dashboard"
                                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-indigo-800 hover:pl-6 group"
                            >
                                <LayoutDashboard className="w-5 h-5 text-indigo-400 group-hover:text-white" />
                                <span className="font-medium">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="/admin/mahasiswa"
                                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-indigo-800 hover:pl-6 group"
                            >
                                <GraduationCap className="w-5 h-5 text-indigo-400 group-hover:text-white" />
                                <span className="font-medium">Mahasiswa</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="/settings"
                                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-indigo-800 hover:pl-6 group"
                            >
                                <Settings className="w-5 h-5 text-indigo-400 group-hover:text-white" />
                                <span className="font-medium">Setting</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sider;