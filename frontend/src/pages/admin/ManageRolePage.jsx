import React from "react";
import ManageRole from "../../components/ManageRole";

const ManageRolePage = () => {
  return (
    <div className="h-full bg-white p-10">
      {/* Create Role */}

      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">
          Create Role
        </h2>
        <form className="flex gap-3">
          <input
            type="text"
            name="role"
            placeholder="Enter role name"
            className="border border-gray-300 px-4 py-2 rounded w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded "
          >
            Add Role
          </button>
        </form>
      </div>
      {/* Role List */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Existing Roles
        </h2>

        {/* <ManageRole roleName="Admin" /> */}
        <ul>
          <li>
            <ManageRole roleName="Admin" />
            <ManageRole roleName="Moderator" />
            <ManageRole roleName="editor" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ManageRolePage;
