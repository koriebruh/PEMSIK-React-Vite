import './App.css';
import React, {useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import Button from "./components/Button.jsx";
import Table from "./components/Tabel.jsx";
import axios from "axios";


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

// function Content() {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [data, setData] = useState([ // DITAMBAHKAN
//         {no: "1", nim: "A11.2022.14616", name: "M. JAMALUDIN NUR"},
//         {no: "2", nim: "A11.2022.xXXXX", name: "SEPUH"},
//         {no: "3", nim: "A11.2022.xXXXX", name: "KCI"},
//     ]);
//
//     const [newStudent, setNewStudent] = useState({ // DITAMBAHKAN
//         nim: '',
//         name: ''
//     });
//
//     // DITAMBAHKAN: State untuk menyimpan data sementara untuk edit
//     const [editStudentIndex, setEditStudentIndex] = useState(null);
//     const [editedStudent, setEditedStudent] = useState({ nim: '', name: '' });
//
//     const handleOpenModal = () => setIsModalOpen(true);
//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//         setEditStudentIndex(null); // Reset saat modal ditutup
//         setEditedStudent({ nim: '', name: '' }); // Reset saat modal ditutup
//     };
//
//
//     const handleAddStudent = (e) => { // DITAMBAHKAN
//         e.preventDefault(); // Mencegah reload halaman
//         const newStudentData = {
//             no: (data.length + 1).toString(), // DITAMBAHKAN
//             nim: newStudent.nim,
//             name: newStudent.name
//         };
//         setData([...data, newStudentData]); // DITAMBAHKAN
//         setNewStudent({nim: '', name: ''}); // DITAMBAHKAN
//         handleCloseModal(); // DITAMBAHKAN
//         Swal.fire('Berhasil!', 'Mahasiswa berhasil ditambahkan', 'success'); // DITAMBAHKAN
//     };
//
//     // Fungsi untuk mengonfirmasi delete
//     const handleDelete = (index) => { // DITAMBAHKAN: Terima index untuk menghapus
//         Swal.fire({
//             title: 'Yakin delete kah bg?',
//             text: 'Barang yang sudah di-delete tidak bisa dikembalikan',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yoi Hapus ja',
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 // DITAMBAHKAN: Hapus data berdasarkan index
//                 const updatedData = data.filter((_, i) => i !== index);
//                 setData(updatedData);
//                 Swal.fire('Terhapus Puh sepuhhh', 'Mampus terhapus bg', 'success');
//             }
//         });
//     };
//
//     // Fungsi untuk mengedit data
//     const handleEdit = (index) => { // DITAMBAHKAN: Terima index untuk mengedit
//         setEditStudentIndex(index);
//         const studentToEdit = data[index];
//         setEditedStudent({nim: studentToEdit.nim, name: studentToEdit.name});
//
//         Swal.fire({
//             title: 'Edit Mahasiswa',
//             html: `
//                 <label for="edit-name" class="block text-gray-700">Nama</label>
//                 <input id="edit-name" type="text" class="w-full px-4 py-2 border rounded-lg" value="${studentToEdit.name}">
//             `,
//             showCancelButton: true,
//             confirmButtonText: 'Simpan',
//             cancelButtonText: 'Batal',
//             preConfirm: () => {
//                 const editedName = document.getElementById('edit-name').value;
//                 if (!editedName) {
//                     Swal.showValidationMessage('Nama tidak boleh kosong');
//                 }
//                 return editedName;
//             },
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 const newName = result.value;
//                 // DITAMBAHKAN: Perbarui data hanya di tampilan
//                 const updatedData = data.map((item, i) =>
//                     i === editStudentIndex ? { ...item, name: newName } : item
//                 );
//                 setData(updatedData);
//                 Swal.fire('Berhasil!', `Nama berhasil diubah menjadi ${newName}`, 'success');
//             }
//         });
//     };
//
//     return (
//         <>
//             {/* Bagian judul dan tombol tambah */}
//             <div className="flex justify-between mb-1 p-4 bg-blue-50">
//                 <h2 className="text-xl font-semibold">LIST MAHASISWA</h2>
//                 <Button
//                     label="Tambah"
//                     className="bg-green-500 text-white"
//                     onClick={handleOpenModal}
//                 />
//             </div>
//
//             {/* Bagian tabel mahasiswa */}
//             <main className="flex-grow p-4 bg-blue-50">
//                 <Table
//                     data={data}
//                     onEdit={handleEdit} // Kirimkan fungsi edit ke tabel
//                     onDelete={handleDelete} // Kirimkan fungsi delete ke tabel
//                 />
//             </main>
//
//
//             {/* Modal Tambah Mahasiswa */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//                     <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
//                         <h2 className="text-xl font-bold mb-4">Tambah Mahasiswa</h2>
//                         <form onSubmit={handleAddStudent}> {/* DITAMBAHKAN */}
//                             <div className="mb-4">
//                                 <label htmlFor="name" className="block text-gray-700">Name</label>
//                                 <input
//                                     id="name"
//                                     type="text"
//                                     className="w-full px-4 py-2 border rounded-lg"
//                                     value={newStudent.name} // DITAMBAHKAN
//                                     onChange={(e) => setNewStudent({
//                                         ...newStudent,
//                                         name: e.target.value
//                                     })} // DITAMBAHKAN
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="nim" className="block text-gray-700">NIM</label>
//                                 <input
//                                     id="nim"
//                                     type="text"
//                                     className="w-full px-4 py-2 border rounded-lg"
//                                     value={newStudent.nim} // DITAMBAHKAN
//                                     onChange={(e) => setNewStudent({...newStudent, nim: e.target.value})} // DITAMBAHKAN
//                                 />
//                             </div>
//                             <div className="flex justify-end">
//                                 <Button
//                                     label="Batal"
//                                     className="bg-gray-500 text-white mr-2"
//                                     onClick={handleCloseModal}
//                                 />
//                                 <Button
//                                     label="Simpan"
//                                     className="bg-green-500 text-white"
//                                     type="submit" // DITAMBAHKAN
//                                 />
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

function Content() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [newStudent, setNewStudent] = useState({ nim: '', name: '' });

    // Mengambil data mahasiswa dari API saat komponen di-mount
    useEffect(() => {
        fetchMahasiswa();
    }, []);

    const fetchMahasiswa = async () => { // DITAMBAHKAN
        try {
            const response = await axios.get('http://localhost:8080/mahasiswa');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleAddStudent = async (e) => { // DITAMBAHKAN
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/mahasiswa', newStudent);
            setData([...data, response.data]); // Menambahkan mahasiswa baru ke state data
            setNewStudent({ nim: '', name: '' });
            handleCloseModal();
            Swal.fire('Berhasil!', 'Mahasiswa berhasil ditambahkan', 'success');
        } catch (error) {
            console.error('Error adding student:', error);
            Swal.fire('Error', 'Gagal menambahkan mahasiswa', 'error');
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Yakin delete kah bg?',
            text: 'Barang yang sudah di-delete tidak bisa dikembalikan',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yoi Hapus ja',
        });

        if (result.isConfirmed) {
            try {
                // Log ID yang akan dihapus
                console.log('Menghapus mahasiswa dengan ID:', id);

                // Melakukan permintaan DELETE ke server
                const response = await axios.delete(`http://localhost:8080/mahasiswa/${id}`);

                // Cek apakah respons sukses
                if (response.status === 200) {
                    // Menghapus mahasiswa dari state data
                    setData(data.filter(student => student.id !== id));
                    Swal.fire('Terhapus Puh sepuhhh', 'Mahasiswa berhasil dihapus', 'success');
                } else {
                    Swal.fire('Error', 'Gagal menghapus mahasiswa', 'error');
                }
            } catch (error) {
                console.error('Error deleting student:', error);
                Swal.fire('Error', 'Gagal menghapus mahasiswa', 'error');
            }
        }
    };


    const handleEdit = async (id, currentName) => { // DITAMBAHKAN
        const { value: newName } = await Swal.fire({
            title: 'Edit Mahasiswa',
            input: 'text',
            inputLabel: 'Nama',
            inputValue: currentName,
            showCancelButton: true,
            confirmButtonText: 'Simpan',
            cancelButtonText: 'Batal',
            preConfirm: (name) => {
                if (!name) {
                    Swal.showValidationMessage('Nama tidak boleh kosong');
                }
                return name;
            },
        });

        if (newName) {
            try {
                await axios.put(`http://localhost:8080/mahasiswa/${id}`, { name: newName });
                setData(data.map(student => (student.id === id ? { ...student, name: newName } : student))); // Mengupdate mahasiswa di state data
                Swal.fire('Berhasil!', `Nama berhasil diubah menjadi ${newName}`, 'success');
            } catch (error) {
                console.error('Error updating student:', error);
                Swal.fire('Error', 'Gagal mengubah nama mahasiswa', 'error');
            }
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
                />
            </div>

            <main className="flex-grow p-4 bg-blue-50">
                <Table
                    data={data}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
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
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    label="Batal"
                                    className="bg-gray-500 text-white mr-2"
                                    onClick={handleCloseModal}
                                />
                                <Button
                                    label="Simpan"
                                    className="bg-green-500 text-white"
                                    type="submit"
                                />
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
