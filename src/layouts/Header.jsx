import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice";
import Swal from "sweetalert2";
import {LogOutIcon} from "lucide-react";

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
        <header className="w-full bg-indigo-900 px-6 py-4">
            <div className="flex justify-end">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                    <LogOutIcon size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </header>
    );
}

export default Header;