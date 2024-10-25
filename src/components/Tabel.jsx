// components/Table.jsx
import React from 'react';
import Baris from './Baris.jsx';

const Table = ({ data, onEdit, onDelete }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <table className="min-w-full table-auto">
                <thead>
                <tr className="bg-gray-200">
                    <th className="px-4 py-2">NO</th>
                    <th className="px-4 py-2">NIM</th>
                    <th className="px-4 py-2">NAME</th>
                    <th className="px-4 py-2">AKSI</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <Baris
                        key={item.id} // Menggunakan item.id sebagai key lebih baik dari index
                        no={index + 1}
                        id={item.id}
                        nim={item.nim}
                        name={item.name}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};



export default Table;
