import Button from "./Button.jsx";
import React from "react";

const Baris = ({ no, id, nim, name, onEdit, onDelete }) => {
    return (
        <tr className="odd:bg-white even:bg-gray-50">
            <td className="border px-4 py-2 text-center">{no}</td>
            <td className="border px-4 py-2">{nim}</td>
            <td className="border px-4 py-2">{name}</td>
            <td className="border px-4 py-2 text-center">
                <div className="flex justify-center gap-2">
                    <Button
                        label="Edit"
                        onClick={() => onEdit(id, name)}
                        className="bg-yellow-500 text-white:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                        Edit
                    </Button>
                    <Button
                        label="Delete"
                        onClick={() => onDelete(id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                        Hapus
                    </Button>
                </div>
            </td>
        </tr>
    );
};

export default Baris;
