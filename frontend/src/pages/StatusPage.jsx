// import React from "react";
// import StatusCard from "../components/StatusCard";

// const StatusPage = () => {
//   return (
//     <div className="w-full min-h-screen bg-white dark:bg-gray-900 pt-16">
//       {/* Profile Header */}
//       <div className="max-w-4xl mx-auto px-6">
//         <div className="flex items-center gap-6">
//           <img
//             src="https://i.pinimg.com/564x/b5/9d/9e/b59d9e9449cb29c2a24fc41643405ab1.jpg"
//             alt="profile"
//             className="w-[70px] h-[70px] rounded-full object-cover"
//           />

//           <div>
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
//               username
//             </h2>

//             <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400 mt-1">
//               <span>
//                 <b>30</b> Followers
//               </span>
//               <span>
//                 <b>30</b> Following
//               </span>
//               <span>
//                 <b>10</b> Posts
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="border-b border-gray-200 dark:border-gray-700 my-6"></div>

//         {/* Status Feed */}
//         <ul className="flex flex-col gap-4">
//           <li>
//             <StatusCard />
//           </li>
//           <li>
//             <StatusCard />
//           </li>
//           <li>
//             <StatusCard />
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default StatusPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import StatusCard from "../components/StatusCard";

const StatusPage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatusPage = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/v1/users/status-page",
          {
            withCredentials: true,
          },
        );

        if (data.success) {
          setProfileData(data.data);
        }
      } catch (error) {
        console.error(error.response?.data?.message || error.message);

        toast.error(
          error.response?.data?.message || "Failed to load profile data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStatusPage();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:text-white">
        Loading...
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex justify-center items-center h-screen dark:text-white">
        No Data Found
      </div>
    );
  }

  const { user, stats, posts } = profileData;

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 pt-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Profile Header */}
        <div className="flex items-center gap-6">
          <img
            src={user?.avatar?.url || "https://placehold.co/200x200"}
            alt={user?.userName}
            className="w-[70px] h-[70px] rounded-full object-cover"
          />

          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {user?.userName}
            </h2>

            {user?.bio && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {user.bio}
              </p>
            )}

            <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400 mt-2">
              <span>
                <b>{stats.followers}</b> Followers
              </span>

              <span>
                <b>{stats.following}</b> Following
              </span>

              <span>
                <b>{stats.posts}</b> Posts
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-b border-gray-200 dark:border-gray-700 my-6"></div>

        {/* Posts */}
        <ul className="flex flex-col gap-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <li key={post._id}>
                <StatusCard post={post} />
              </li>
            ))
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400">
              No posts yet.
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default StatusPage;
