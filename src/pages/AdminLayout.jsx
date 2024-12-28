import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {
    fetchStudents,
    addStudent,
    updateStudent,
    deleteStudent
} from '../store/studentSlice.jsx';

import Header from "../layouts/Header";
import Sider from "../layouts/Sider";
import Footer from "../layouts/Footer";
import ModalTambah from "../layouts/ModalTambah";
import Button from "../components/Button.jsx";
import Table from "../components/Tabel.jsx";

function AdminLayout() {
    return (
        <div className="bg-gray-100">
            <div className="flex min-h-screen">
                <Sider />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <Content />
                    <Footer />
                </div>
            </div>
            <ModalTambah />
        </div>
    );
}

const Content = () => {
    const dispatch = useDispatch();
    const { data, status, error } = useSelector(state => state.students);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newStudent, setNewStudent] = useState({
        progdi_id: '',
        nim: '',
        nama: '',
        alamat: '',
        umur: ''
    });

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchStudents()).unwrap()
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error,
                        confirmButtonColor: '#dc3545'
                    });
                });
        }
    }, [status, dispatch]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewStudent({
            progdi_id: '',
            nim: '',
            nama: '',
            alamat: '',
            umur: ''
        });
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();

        if (
            !newStudent.progdi_id.trim() ||
            !newStudent.nim.trim() ||
            !newStudent.nama.trim() ||
            !newStudent.alamat.trim() ||
            isNaN(newStudent.umur) || newStudent.umur <= 0
        ) {
            Swal.fire({
                icon: 'error',
                title: 'Validasi Error',
                text: 'Semua bidang harus diisi dengan benar dan valid',
                confirmButtonColor: '#dc3545'
            });
            return;
        }

        const nimExists = data.some(student => student.nim === newStudent.nim);
        if (nimExists) {
            Swal.fire({
                icon: 'warning',
                title: 'NIM Sudah Digunakan',
                text: 'NIM yang dimasukkan sudah ada. Silakan gunakan NIM lain.',
                confirmButtonColor: '#dc3545'
            });
            return;
        }

        try {
            await dispatch(addStudent(newStudent)).unwrap();
            handleCloseModal();
            await Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Mahasiswa berhasil ditambahkan',
                timer: 1500,
                showConfirmButton: false
            });
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: error,
                confirmButtonColor: '#dc3545'
            });
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
                await dispatch(deleteStudent(id)).unwrap();
                await Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Data berhasil dihapus',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Gagal Menghapus',
                text: error,
                confirmButtonColor: '#dc3545'
            });
        }
    };

    const handleEdit = async (id, currentData) => {
        try {
            const { value: formData, isConfirmed } = await Swal.fire({
                title: 'Edit Data Mahasiswa',
                html: `
          <input id="swal-input-nim" class="swal2-input" placeholder="NIM" value="${currentData.nim}" />
          <input id="swal-input-nama" class="swal2-input" placeholder="Nama" value="${currentData.nama}" />
          <input id="swal-input-alamat" class="swal2-input" placeholder="Alamat" value="${currentData.alamat}" />
          <input id="swal-input-umur" class="swal2-input" placeholder="Umur" type="number" value="${currentData.umur}" />
        `,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Simpan',
                cancelButtonText: 'Batal',
                confirmButtonColor: '#198754',
                cancelButtonColor: '#6c757d',
                preConfirm: () => {
                    const nim = document.getElementById('swal-input-nim').value.trim();
                    const nama = document.getElementById('swal-input-nama').value.trim();
                    const alamat = document.getElementById('swal-input-alamat').value.trim();
                    const umur = parseInt(document.getElementById('swal-input-umur').value, 10);

                    if (!nim || !nama || !alamat || isNaN(umur)) {
                        Swal.showValidationMessage('Semua bidang harus diisi dengan benar');
                        return null;
                    }

                    return { nim, nama, alamat, umur };
                }
            });

            if (isConfirmed && formData) {
                const changes = Object.keys(formData).reduce((acc, key) => {
                    if (formData[key] !== currentData[key]) {
                        acc[key] = formData[key];
                    }
                    return acc;
                }, {});

                if (Object.keys(changes).length === 0) {
                    Swal.fire({
                        icon: 'info',
                        title: 'Tidak Ada Perubahan',
                        text: 'Data tidak berubah',
                        confirmButtonColor: '#6c757d'
                    });
                    return;
                }

                await dispatch(updateStudent({ id, changes })).unwrap();
                await Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Data berhasil diperbarui',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Gagal Memperbarui',
                text: error,
                confirmButtonColor: '#dc3545'
            });
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
                    disabled={status === 'loading'}
                />
            </div>

            <main className="flex-grow p-4 bg-blue-50">
                {status === 'loading' ? (
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
                                <label htmlFor="progdi_id" className="block text-gray-700">Program Studi ID</label>
                                <input
                                    id="progdi_id"
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    value={newStudent.progdi_id}
                                    onChange={(e) => setNewStudent({...newStudent, progdi_id: e.target.value})}
                                    disabled={status === 'loading'}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="nim" className="block text-gray-700">NIM</label>
                                <input
                                    id="nim"
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    value={newStudent.nim}
                                    onChange={(e) => setNewStudent({...newStudent, nim: e.target.value})}
                                    disabled={status === 'loading'}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="nama" className="block text-gray-700">Nama</label>
                                <input
                                    id="nama"
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    value={newStudent.nama}
                                    onChange={(e) => setNewStudent({...newStudent, nama: e.target.value})}
                                    disabled={status === 'loading'}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="alamat" className="block text-gray-700">Alamat</label>
                                <input
                                    id="alamat"
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    value={newStudent.alamat}
                                    onChange={(e) => setNewStudent({...newStudent, alamat: e.target.value})}
                                    disabled={status === 'loading'}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="umur" className="block text-gray-700">Umur</label>
                                <input
                                    id="umur"
                                    type="number"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    value={newStudent.umur}
                                    onChange={(e) => setNewStudent({...newStudent, umur: e.target.value})}
                                    disabled={status === 'loading'}
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    label="Batal"
                                    className="bg-gray-500 text-white mr-2"
                                    onClick={handleCloseModal}
                                    disabled={status === 'loading'}
                                />
                                <Button
                                    label="Simpan"
                                    className="bg-green-500 text-white"
                                    type="submit"
                                    disabled={status === 'loading'}
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