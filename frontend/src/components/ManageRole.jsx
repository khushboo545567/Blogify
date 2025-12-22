import React from "react";

const ManageRole = ({ roleName }) => {
  return (
    <div className="border border-gray-300 rounded px-6 py-3 mb-3">
      <div className="flex justify-between items-center">
        <span className="text-gray-800 font-medium">{roleName}</span>
        <button className="text-sm text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ManageRole;
