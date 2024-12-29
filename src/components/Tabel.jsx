// components/Table.jsx
import React from 'react';

// const Table = ({ data, onEdit, onDelete }) => {
//     return (
//         <div className="bg-white p-6 rounded-lg shadow">
//             <table className="min-w-full table-auto">
//                 <thead>
//                 <tr className="bg-gray-200">
//                     <th className="px-4 py-2">NO</th>
//                     <th className="px-4 py-2">NIM</th>
//                     <th className="px-4 py-2">NAME</th>
//                     <th className="px-4 py-2">AKSI</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {data.map((item, index) => (
//                     <Baris
//                         key={item.id} // Menggunakan item.id sebagai key lebih baik dari index
//                         no={index + 1}
//                         id={item.id}
//                         nim={item.nim}
//                         name={item.name}
//                         onEdit={onEdit}
//                         onDelete={onDelete}
//                     />
//                 ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

import { Pencil, Trash2, User, MapPin, GraduationCap, Hash, CalendarClock } from 'lucide-react';

const Table = ({data, onEdit, onDelete}) => {
    return (
        <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                            <Hash size={16} className="text-gray-500" />
                            NIM
                        </div>
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                            <User size={16} className="text-gray-500" />
                            Nama
                        </div>
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-gray-500" />
                            Alamat
                        </div>
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                            <CalendarClock size={16} className="text-gray-500" />
                            Umur
                        </div>
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                            <GraduationCap size={16} className="text-gray-500" />
                            Program Studi
                        </div>
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                        Aksi
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {data && data.length > 0 ? (
                    data.map(student => (
                        <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {student.nim}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {student.nama}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {student.alamat}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {student.umur}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {student.progdi?.nama}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                <button
                                    onClick={() => onEdit(student.id, student.nama)}
                                    className="inline-flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2 transition-colors duration-200"
                                >
                                    <Pencil size={14} />
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(student.id)}
                                    className="inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors duration-200"
                                >
                                    <Trash2 size={14} />
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                            Tidak ada data
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
