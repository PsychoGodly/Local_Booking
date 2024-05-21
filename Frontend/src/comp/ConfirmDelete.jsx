import React from "react";

const ConfirmDelete = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-md w-1/3">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md mr-2"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
