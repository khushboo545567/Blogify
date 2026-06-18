import React from "react";

const Card = ({ post }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      {post.postImage?.length > 0 && (
        <img
          src={post.postImage[0]}
          alt={post.title}
          className="w-full h-60 object-cover rounded-lg"
        />
      )}

      <h2 className="text-xl font-semibold mt-3 dark:text-white">
        {post.title}
      </h2>

      <p className="text-gray-600 dark:text-gray-300 mt-2">
        {post.description}
      </p>

      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
        <span>❤️ {post.likesCount}</span>
        <span>💬 {post.commentsCount}</span>
      </div>

      <div className="mt-2 text-sm text-gray-400">
        Posted by: {post.postedBy?.userName}
      </div>
    </div>
  );
};

export default Card;
