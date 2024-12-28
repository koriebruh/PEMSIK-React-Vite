import React from "react";
import { useNavigate } from "react-router-dom"; // Untuk navigasi setelah logout
import Swal from "sweetalert2"; // Untuk menampilkan SweetAlert

function Header() {
    const navigate = useNavigate(); // Hook untuk redirect setelah logout

    const handleLogout = async () => {
        const token = localStorage.getItem("authToken"); // Mengambil token dari localStorage
        if (!token) {
            Swal.fire({
                title: "Error!",
                text: "No token found. Please login again.",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }

        try {
            const response = await fetch("http://demo-api.syaifur.io/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Mengirimkan token dalam header Authorization
                },
            });

            const data = await response.json();

            if (response.ok) {
                // SweetAlert sukses
                Swal.fire({
                    title: "Logged Out",
                    text: "You have been logged out successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    // Hapus token dari localStorage dan redirect ke halaman login
                    localStorage.removeItem("authToken");
                    navigate("/"); // Redirect ke halaman login
                });
            } else {
                // SweetAlert error jika logout gagal
                Swal.fire({
                    title: "Error!",
                    text: data.message || "Logout failed.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            // SweetAlert error jika ada kesalahan jaringan
            Swal.fire({
                title: "Oops!",
                text: "An error occurred during logout.",
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
