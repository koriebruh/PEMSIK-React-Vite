import React from "react";

function Header() {
    return (
        <header className="bg-white p-4">
            <div className="flex justify-end">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Logout</button>
            </div>
        </header>
    );
}


export default Header;
