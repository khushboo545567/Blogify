import React, { useEffect, useState } from "react";

const ManageAssignRoleUser = () => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  // Fetch roles & users from DB
  useEffect(() => {
    // roles from backend
    setRoles(["Admin", "Editor", "Moderator"]);

    // users from backend
    setUsers([
      { id: 1, username: "khushboo", role: "Editor" },
      { id: 2, username: "rahul", role: "User" },
    ]);
  }, []);

  const handleAssign = (e) => {
    e.preventDefault();

    if (!selectedUser || !selectedRole) {
      alert("Select user and role");
      return;
    }

    console.log("Assign role:", selectedRole, "to", selectedUser);
    // API CALL → POST /assign-role
  };

  return (
    <div className="max-w-3xl bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-6 text-gray-800">
        Assign Role to User
      </h2>

      {/* Assign Form */}
      <form onSubmit={handleAssign} className="flex gap-4 mb-8">
        {/* User Select */}
        <select
          className="border px-4 py-2 rounded w-48"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select User</option>
          {users.map((u) => (
            <option key={u.id} value={u.username}>
              {u.username}
            </option>
          ))}
        </select>

        {/* Role Select */}
        <select
          className="border px-4 py-2 rounded w-48"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Assign
        </button>
      </form>

      {/* User Role List */}
      <h3 className="text-md font-semibold mb-3 text-gray-800">User Roles</h3>

      <ul className="space-y-2">
        {users.map((u) => (
          <li
            key={u.id}
            className="flex justify-between items-center border px-4 py-2 rounded"
          >
            <span className="text-gray-700">{u.username}</span>
            <span className="text-sm bg-gray-100 px-3 py-1 rounded">
              {u.role}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageAssignRoleUser;
