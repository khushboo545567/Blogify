import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const ProfilePage = () => {
  // const user = {
  //   userName: "khushboo_yadav",
  //   email: "khushboo@gmail.com",
  //   bio: "Frontend developer & tech enthusiast",
  //   joinedAt: "20 Dec 2025",
  //   posts: 12,
  //   followers: 340,
  //   following: 180,
  //   avatar: "https://placehold.co/200x200",
  // };

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/users/get-current-user`,
          { withCredentials: true }
        );
        if (data.success) {
          setUserData(data.data); // ✅ only user object
        }
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };
    fetchProfile();
  }, []);

  console.log("userdata", userData);

  return (
    <div className=" bg-white h-full dark:bg-gray-900 p-6">
      {/* <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md flex"> */}
      {/* LEFT SIDEBAR */}
      <div className="w-1/4  p-6 text-center">
        {/* AVATAR */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        {/* USERNAME */}
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex justify-center items-center gap-2">
          {user.userName}
          <i className="ri-edit-line cursor-pointer text-gray-500 dark:text-gray-400"></i>
        </h2>
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-3/4 p-6 space-y-6">
        {/* EMAIL */}
        <ProfileRow label="Email" value={user.email} editable />

        {/* BIO */}
        <ProfileRow label="Bio" value={user.bio} editable />

        {/* PASSWORD */}
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
          <div>
            <p className="text-sm text-gray-500">Password</p>
            <p className="text-gray-800 dark:text-gray-100">********</p>
          </div>
          <button className="text-blue-600 text-sm hover:underline">
            Change Password
          </button>
        </div>

        {/* JOINED */}
        <ProfileRow label="Joined At" value={user.joinedAt} />

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 text-center pt-4">
          <StatBox label="Posts" value={user.posts} />
          <StatBox label="Followers" value={user.followers} />
          <StatBox label="Following" value={user.following} />
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default ProfilePage;

/* ---------- REUSABLE COMPONENTS ---------- */

const ProfileRow = ({ label, value, editable }) => (
  <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-gray-800 dark:text-gray-100">{value}</p>
    </div>
    {editable && (
      <i className="ri-edit-line cursor-pointer text-gray-500 dark:text-gray-400"></i>
    )}
  </div>
);

const StatBox = ({ label, value }) => (
  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
    <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
      {value}
    </p>
    <p className="text-sm text-gray-500 dark:text-gray-300">{label}</p>
  </div>
);
