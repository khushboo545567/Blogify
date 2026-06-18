import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white w-full h-full">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Share Your Thoughts with the World
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mb-6">
          A simple and secure blogging platform where you can read, write, and
          share your ideas with others.
        </p>
        <div className="flex gap-4">
          <Link
            to="/feed"
            className="bg-black dark:bg-white dark:text-black text-white px-6 py-2 rounded-sm "
          >
            Explore Blogs
          </Link>
          <Link
            to="/postblog"
            className="border border-black text-black dark:text-white px-6 py-2 rounded-sm dark:border-white   transition"
          >
            Create Blog
          </Link>
        </div>
      </section>

      {/* Featured Blogs */}
      {/* Why Choose Us */}
      <section className="px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose Our Platform?
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="text-4xl mb-4">✍️</div>
            <h3 className="text-xl font-semibold mb-2">Write Freely</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Share your ideas, experiences, and knowledge with an easy-to-use
              editor.
            </p>
          </div>

          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold mb-2">Reach Readers</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Connect with people from around the world and build your audience.
            </p>
          </div>

          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2">Engage & Grow</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Follow creators, interact through comments, and discover new
              perspectives every day.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
