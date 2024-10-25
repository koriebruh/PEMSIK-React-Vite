import Button from "./Button.jsx";
import React from "react";

function Baris(props) {
    return (
        <tr className="odd:bg-white even:bg-gray-50">
            <td className="border px-4 py-2">{props.no}</td>
            <td className="border px-4 py-2">{props.nim}</td>
            <td className="border px-4 py-2">{props.name}</td>
            <td className="border px-4 py-2">
                <div className="space-x-2">
                    <Button
                        label="Edit"
                        className="bg-yellow-500 text-white"
                        onClick={props.onEdit}
                    />
                    <Button
                        label="Delete"
                        className="bg-red-500 text-white"
                        onClick={props.onDelete}
                    />
                </div>
            </td>
        </tr>
    );
}

export default Baris;
