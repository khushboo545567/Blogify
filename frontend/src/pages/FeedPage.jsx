import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Card from "../components/Card";

const FeedPage = () => {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedPosts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/v1/post/get-post-for-feed",
          {
            withCredentials: true,
          },
        );

        console.log("API Response:", data);

        if (data.success) {
          // data.data contains { posts, page, limit, total, totalPages }
          setPosts(data.data.posts);
        }
      } catch (error) {
        console.error(error.response?.data?.message || error.message);

        toast.error(
          error.response?.data?.message || "Failed to fetch feed posts",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeedPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 p-6">
      {/* Categories */}
      <div className="relative w-60 mb-6 pl-8">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between
          bg-gray-50 dark:bg-gray-800
          text-gray-700 dark:text-gray-200
          px-4 py-2 rounded-lg shadow"
        >
          <span>Categories</span>
          <i className="ri-arrow-down-s-line text-xl"></i>
        </button>

        {open && (
          <ul
            className="absolute mt-2 w-full
            bg-gray-50 dark:bg-gray-800
            rounded-lg shadow-lg overflow-hidden z-10"
          >
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white cursor-pointer">
              Education
            </li>

            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white cursor-pointer">
              Food
            </li>

            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white cursor-pointer">
              Technology
            </li>
          </ul>
        )}
      </div>

      {/* Posts */}
      <div className="flex flex-col gap-5 px-5">
        {posts && posts.length > 0 ? (
          posts.map((post) => <Card key={post._id} post={post} />)
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-300">
            No posts available in your feed.
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPage;
