import React from "react";
import AssignPermissionCard from "../../components/AssignPermissionCard";

const AssignPermission = () => {
  const users = [
    { id: 1, username: "khushboo", role: "Editor" },
    { id: 2, username: "rahul", role: "User" },
  ];

  const roles = ["Admin", "Editor", "Moderator"];
  const action = ["crate", "delete", "post", "read"];

  return (
    <div className="w-full min-h-screen bg-white p-6">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-6">Assign Permission To Role</h2>

      {/* Form UI */}
      <form className="flex gap-4 items-center mb-8 flex-wrap">
        {/* User Select */}
        <select className="border border-gray-300 px-4 py-2 rounded w-48">
          <option value="">Select User</option>
          {users.map((u) => (
            <option key={u.id} value={u.username}>
              {u.username}
            </option>
          ))}
        </select>

        {/* Action Select */}
        <select className="border border-gray-300 px-4 py-2 rounded w-48">
          <option value="">Select Action</option>
          {action.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>

        {/* Role Select */}
        <select className="border border-gray-300 px-4 py-2 rounded w-48">
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        {/* Button */}
        <button
          type="submit"
          className="bg-black text-white px-5 py-2 rounded "
        >
          Assign
        </button>
      </form>

      {/* Cards List */}
      <div className="space-y-4">
        <AssignPermissionCard />
        <AssignPermissionCard />
        <AssignPermissionCard />
        <AssignPermissionCard />
      </div>
    </div>
  );
};

export default AssignPermission;
