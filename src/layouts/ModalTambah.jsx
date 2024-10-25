import React from "react";

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


export default ModalTambah;
