import './App.css';
import React, {useState} from 'react';
import Swal from 'sweetalert2';
import Button from "./components/Button.jsx";
import Table from "./components/Tabel.jsx";


function App() {
    return (
        <div className="bg-gray-100">
            <div className="flex min-h-screen">
                <Sider/>

                <div className="flex-1 flex flex-col">
                    <Header/>
                    <Content/>
                    <Footer/>
                </div>
            </div>

            <ModalTambah/>
        </div>
    );
}

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

function Header() {
    return (
        <header className="bg-white p-4">
            <div className="flex justify-end">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Logout</button>
            </div>
        </header>
    );
}

function Content() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Sample data for the table
    const data = [
        { no: "1", nim: "A11.2022.14616", name: "M. JAMALUDIN NUR" },
        { no: "2", nim: "A11.2022.xXXXX", name: "SEPUH" },
        { no: "3", nim: "A11.2022.xXXXX", name: "KCI" },
    ];

    // Fungsi untuk membuka dan menutup modal
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    // Fungsi untuk mengonfirmasi delete
    const handleDelete = () => {
        Swal.fire({
            title: 'Yakin delete kah bg?',
            text: 'Barang yang sudah di-delete tidak bisa dikembalikan',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yoi Hapus ja',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Terhapus Puh sepuhhh', 'Mampus terhapus bg', 'success');
            }
        });
    };

    // Fungsi untuk mengedit data
    const handleEdit = () => {
        Swal.fire({
            title: 'Edit Mahasiswa',
            html: `
        <label for="edit-name" class="block text-gray-700">Nama</label>
        <input id="edit-name" type="text" class="w-full px-4 py-2 border rounded-lg" value="Nama Mahasiswa">
      `,
            showCancelButton: true,
            confirmButtonText: 'Simpan',
            cancelButtonText: 'Batal',
            preConfirm: () => {
                const editedName = document.getElementById('edit-name').value;
                if (!editedName) {
                    Swal.showValidationMessage('Nama tidak boleh kosong');
                }
                return editedName;
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const newName = result.value;
                Swal.fire('Berhasil!', `Nama berhasil diubah menjadi ${newName}`, 'success');
            }
        });
    };

    return (
        <>
            {/* Bagian judul dan tombol tambah */}
            <div className="flex justify-between mb-1 p-4 bg-blue-50">
                <h2 className="text-xl font-semibold">LIST MAHASISWA</h2>
                <Button
                    label="Tambah"
                    className="bg-green-500 text-white"
                    onClick={handleOpenModal}
                />
            </div>

            {/* Bagian tabel mahasiswa */}
            <main className="flex-grow p-4 bg-blue-50">
                <Table
                    data={data}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </main>


            {/* Modal Tambah Mahasiswa */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">Tambah Mahasiswa</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700">Name</label>
                                <input id="name" type="text" className="w-full px-4 py-2 border rounded-lg"/>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    label="Batal"
                                    className="bg-gray-500 text-white mr-2"
                                    onClick={handleCloseModal}
                                />
                                <Button label="Simpan" className="bg-green-500 text-white" />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

function Footer() {
    return (
        <footer className="bg-indigo-900 text-white p-4 text-center">
            @copyright; Admin IMPHNEM
        </footer>
    );
}

function ModalTambah() {
    return (
        <div id="modal-tambah" className="hidden fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Tambah Mahasiswa</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Name</label>
                        <input id="name" type="text" className="w-full px-4 py-2 border rounded-lg"/>
                    </div>
                    <div className="flex justify-end">
                        <button id="btn-batal" className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Batal</button>
                        <button className="bg-green-500 text-white px-4 py-2">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default App;
