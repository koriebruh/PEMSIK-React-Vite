import React from "react";

function Sider() {
    return (
        <aside className="w-64 bg-indigo-900 text-white">
            <div className="p-4">
                <h1 className="text-2xl font-bold">ADMIN PANEL</h1>
                <nav className="py-2 px-4 mt-4">
                    <ul>
                        <li className="hover:bg-indigo-700">
                            <a href="">Dashboard</a>
                        </li>
                        <li className="hover:bg-indigo-700">
                            <a href="">Mahasiswa</a>
                        </li>
                        <li className="hover:bg-indigo-700">
                            <a href="">Setting</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}


export default Sider;
