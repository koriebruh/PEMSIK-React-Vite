import '../App.css';
import React, {useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import Button from "../components/Button.jsx";
import Table from "../components/Tabel.jsx";
import Header from "../layouts/Header.jsx"
import axios from "axios";
import Sider from "../layouts/Sider.jsx";
import Footer from "../layouts/Footer.jsx";
import ModalTambah from "../layouts/ModalTambah.jsx";

function AdminLayout() {
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

const Content = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newStudent, setNewStudent] = useState({ nim: '', name: '' });

    useEffect(() => {
        fetchMahasiswa();
    }, []);

    const fetchMahasiswa = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/mahasiswa');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Gagal mengambil data mahasiswa',
                confirmButtonColor: '#dc3545'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewStudent({ nim: '', name: '' });
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        if (!newStudent.nim.trim() || !newStudent.name.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Validasi Error',
                text: 'NIM dan Nama harus diisi',
                confirmButtonColor: '#dc3545'
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/mahasiswa', newStudent);

            if (response.data) {
                setData(prevData => [...prevData, response.data]);
                handleCloseModal();
                await Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Mahasiswa berhasil ditambahkan',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            console.error('Error adding student:', error);
            await Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: error.response?.data?.message || 'Gagal menambahkan mahasiswa',
                confirmButtonColor: '#dc3545'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Konfirmasi Hapus',
                text: 'Data yang sudah dihapus tidak dapat dikembalikan',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Ya, Hapus',
                cancelButtonText: 'Batal'
            });

            if (result.isConfirmed) {
                setIsLoading(true);

                const response = await axios.delete(`http://localhost:8080/mahasiswa/${id}`);

                if (response.status === 200) {
                    // Optimistic update
                    setData(prevData => prevData.filter(student => student.id !== id));

                    await Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Data berhasil dihapus',
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
            }
        } catch (error) {
            console.error('Error deleting:', error);
            await Swal.fire({
                icon: 'error',
                title: 'Gagal Menghapus',
                text: error.response?.data?.message || 'Terjadi kesalahan saat menghapus data',
                confirmButtonColor: '#dc3545'
            });
            // Refresh data if delete failed
            await fetchMahasiswa();
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = async (id, currentName) => {
        try {
            const { value: newName, isConfirmed } = await Swal.fire({
                title: 'Edit Data',
                input: 'text',
                inputLabel: 'Nama Mahasiswa',
                inputValue: currentName,
                showCancelButton: true,
                confirmButtonText: 'Simpan',
                cancelButtonText: 'Batal',
                confirmButtonColor: '#198754',
                cancelButtonColor: '#6c757d',
                inputValidator: (value) => {
                    if (!value || !value.trim()) {
                        return 'Nama tidak boleh kosong!';
                    }
                    if (value.length > 100) {
                        return 'Nama terlalu panjang (maksimal 100 karakter)';
                    }
                    return null;
                }
            });

            if (isConfirmed && newName && newName.trim()) {
                setIsLoading(true);

                const response = await axios.put(`http://localhost:8080/mahasiswa/${id}`, {
                    name: newName.trim()
                });

                if (response.status === 200 && response.data) {
                    // Optimistic update
                    setData(prevData =>
                        prevData.map(student =>
                            student.id === id ? { ...student, name: newName.trim() } : student
                        )
                    );

                    await Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Data berhasil diperbarui',
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
            }
        } catch (error) {
            console.error('Error updating:', error);
            await Swal.fire({
                icon: 'error',
                title: 'Gagal Memperbarui',
                text: error.response?.data?.message || 'Terjadi kesalahan saat memperbarui data',
                confirmButtonColor: '#dc3545'
            });
            // Refresh data if update failed
            await fetchMahasiswa();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="flex justify-between mb-1 p-4 bg-blue-50">
                <h2 className="text-xl font-semibold">LIST MAHASISWA</h2>
                <Button
                    label="Tambah"
                    className="bg-green-500 text-white"
                    onClick={handleOpenModal}
                    disabled={isLoading}
                />
            </div>

            <main className="flex-grow p-4 bg-blue-50">
                {isLoading ? (
                    <div className="flex justify-center items-center h-32">
                        <p>Loading...</p>
                    </div>
                ) : (
                    <Table
                        data={data}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">Tambah Mahasiswa</h2>
                        <form onSubmit={handleAddStudent}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    value={newStudent.name}
                                    onChange={(e) => setNewStudent({
                                        ...newStudent,
                                        name: e.target.value
                                    })}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="nim" className="block text-gray-700">NIM</label>
                                <input
                                    id="nim"
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    value={newStudent.nim}
                                    onChange={(e) => setNewStudent({ ...newStudent, nim: e.target.value })}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    label="Batal"
                                    className="bg-gray-500 text-white mr-2"
                                    onClick={handleCloseModal}
                                    disabled={isLoading}
                                />
                                <Button
                                    label="Simpan"
                                    className="bg-green-500 text-white"
                                    type="submit"
                                    disabled={isLoading}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminLayout;
