import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
export default function Layout() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <Outlet />
    </>
  );
}
