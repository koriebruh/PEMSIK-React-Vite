import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice";
import Swal from "sweetalert2";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const result = await dispatch(logoutUser()).unwrap();

            Swal.fire({
                title: "Logged Out",
                text: "You have been logged out successfully.",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                navigate("/");
            });
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error || "Logout failed.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <header className="w-64 bg-indigo-900">
            <div className="flex justify-end">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Header;