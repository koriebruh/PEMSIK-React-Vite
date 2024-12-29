import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { School, UserPlus, Loader2, GraduationCap, User, MapPin, Contact, CalendarClock, Save, X } from 'lucide-react';
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
            <div className="flex justify-between items-center mb-1 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                    <School className="text-blue-600" size={24} />
                    <h2 className="text-xl font-semibold text-gray-800">LIST MAHASISWA</h2>
                </div>
                <Button
                    label={
                        <div className="flex items-center gap-2">
                            <UserPlus size={18} />
                            <span>Tambah</span>
                        </div>
                    }
                    className="bg-green-500 hover:bg-green-600 text-white transition-colors duration-200"
                    onClick={handleOpenModal}
                    disabled={status === 'loading'}
                />
            </div>

            <main className="flex-grow p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-sm">
                {status === 'loading' ? (
                    <div className="flex justify-center items-center h-32">
                        <Loader2 className="animate-spin mr-2" size={24} />
                        <p className="text-gray-600">Loading...</p>
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-w-md">
                        <div className="flex items-center gap-2 mb-4">
                            <GraduationCap className="text-blue-600" size={24} />
                            <h2 className="text-xl font-bold text-gray-800">Tambah Mahasiswa</h2>
                        </div>
                        <form onSubmit={handleAddStudent} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="progdi_id" className="flex items-center gap-2 text-gray-700 font-medium">
                                    <GraduationCap size={16} />
                                    <span>Program Studi ID</span>
                                </label>
                                <input
                                    id="progdi_id"
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    value={newStudent.progdi_id}
                                    onChange={(e) => setNewStudent({...newStudent, progdi_id: e.target.value})}
                                    disabled={status === 'loading'}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="nim" className="flex items-center gap-2 text-gray-700 font-medium">
                                    <Contact size={16} />
                                    <span>NIM</span>
                                </label>
                                <input
                                    id="nim"
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    value={newStudent.nim}
                                    onChange={(e) => setNewStudent({...newStudent, nim: e.target.value})}
                                    disabled={status === 'loading'}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="nama" className="flex items-center gap-2 text-gray-700 font-medium">
                                    <User size={16} />
                                    <span>Nama</span>
                                </label>
                                <input
                                    id="nama"
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    value={newStudent.nama}
                                    onChange={(e) => setNewStudent({...newStudent, nama: e.target.value})}
                                    disabled={status === 'loading'}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="alamat" className="flex items-center gap-2 text-gray-700 font-medium">
                                    <MapPin size={16} />
                                    <span>Alamat</span>
                                </label>
                                <input
                                    id="alamat"
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    value={newStudent.alamat}
                                    onChange={(e) => setNewStudent({...newStudent, alamat: e.target.value})}
                                    disabled={status === 'loading'}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="umur" className="flex items-center gap-2 text-gray-700 font-medium">
                                    <CalendarClock size={16} />
                                    <span>Umur</span>
                                </label>
                                <input
                                    id="umur"
                                    type="number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    value={newStudent.umur}
                                    onChange={(e) => setNewStudent({...newStudent, umur: e.target.value})}
                                    disabled={status === 'loading'}
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <Button
                                    label={
                                        <div className="flex items-center gap-2">
                                            <X size={18} />
                                            <span>Batal</span>
                                        </div>
                                    }
                                    className="bg-gray-500 hover:bg-gray-600 text-white transition-colors duration-200"
                                    onClick={handleCloseModal}
                                    disabled={status === 'loading'}
                                />
                                <Button
                                    label={
                                        <div className="flex items-center gap-2">
                                            <Save size={18} />
                                            <span>Simpan</span>
                                        </div>
                                    }
                                    className="bg-green-500 hover:bg-green-600 text-white transition-colors duration-200"
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