import React from "react";

const Card = () => {
  return (
    <div
      className="p-4 w-full h-full
      bg-white dark:bg-gray-900
      border-b border-gray-200 dark:border-gray-700"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
          <img
            src="https://i.pinimg.com/564x/b5/9d/9e/b59d9e9449cb29c2a24fc41643405ab1.jpg"
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="font-medium text-gray-800 dark:text-gray-200">
          username
        </span>
      </div>

      {/* Body */}
      <div className="flex justify-between gap-4">
        {/* Text Content */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Card Title
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            This is a simple description of the post content. This is a simple
            description of the post content. This is a simple description of the
            post content. This is a simple description of the post content.
          </p>

          {/* Actions */}
          <div className="flex gap-6 text-gray-600 dark:text-gray-300 mt-3">
            <p>6 days ago</p>
            <button className="flex items-center gap-1 hover:text-blue-500">
              <i className="ri-thumb-up-line"></i>
              80
            </button>

            <button className="flex items-center gap-1 hover:text-green-500">
              <i className="ri-chat-3-line"></i>
              80
            </button>

            <button className="hover:text-yellow-500">
              <i className="ri-bookmark-line"></i>
            </button>
          </div>
        </div>

        {/* Post Image */}
        <div className="w-[180px] h-[110px] overflow-hidden shrink-0">
          <img
            src="https://i.pinimg.com/564x/b5/9d/9e/b59d9e9449cb29c2a24fc41643405ab1.jpg"
            alt="post"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
