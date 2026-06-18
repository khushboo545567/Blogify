import React from "react";

// const StatusCard = () => {
//   return (
//     <div
//       className="p-4
//       bg-white dark:bg-gray-900
//       border-b border-gray-200 dark:border-gray-700"
//     >
//       <div className="flex justify-between gap-4">
//         {/* Content */}
//         <div className="flex-1">
//           <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//             Card Title
//           </h3>

//           <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
//             This is a simple description of the post content. This is a simple
//             description of the post content. This is a simple description of the
//             post content.
//           </p>

//           {/* Footer */}
//           <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mt-4">
//             <span>6 days ago</span>

//             <button className="flex items-center gap-1 hover:text-blue-500">
//               <i className="ri-thumb-up-line"></i>
//               80
//             </button>

//             <button className="flex items-center gap-1 hover:text-green-500">
//               <i className="ri-chat-3-line"></i>
//               80
//             </button>

//             <button className="hover:text-yellow-500">
//               <i className="ri-bookmark-line"></i>
//             </button>
//           </div>
//         </div>

//         {/* Image */}
//         <div className="w-[180px] h-[110px] rounded-lg overflow-hidden shrink-0">
//           <img
//             src="https://i.pinimg.com/564x/b5/9d/9e/b59d9e9449cb29c2a24fc41643405ab1.jpg"
//             alt="post"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

const StatusCard = ({ post }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold dark:text-white">{post.title}</h2>

      <div
        className="mt-2 text-gray-700 dark:text-gray-300"
        dangerouslySetInnerHTML={{
          __html: post.description,
        }}
      />

      <div className="flex gap-4 mt-3 text-sm text-gray-500">
        <span>❤️ {post.likesCount}</span>
        <span>💬 {post.commentsCount}</span>
      </div>
    </div>
  );
};
export default StatusCard;
