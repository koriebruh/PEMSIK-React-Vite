import Sider from "../layouts/Sider.jsx";
import Header from "../layouts/Header.jsx";
import Footer from "../layouts/Footer.jsx";
import ModalTambah from "../layouts/ModalTambah.jsx";
import React from "react";

function Dashboard() {
    return (
        <div className="bg-gray-100">
            <div className="flex min-h-screen">
                <Sider/>

                <div className="flex-1 flex flex-col">
                    <Header/>
                    <h1>HAI INI DASH BOARD</h1>
                    <Footer/>
                </div>
            </div>

            <ModalTambah/>
        </div>
    );
}

export default Dashboard;
