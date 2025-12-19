import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
export default function MainLayout() {
  return (
    <>
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div
          className="
            ml-64           /* match sidebar width */
            mt-16           /* match navbar height */
            w-full
            min-h-[calc(100vh-4rem)]
            bg-gray-100 dark:bg-gray-900
          "
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}
