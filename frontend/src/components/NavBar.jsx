import React from "react";
import "remixicon/fonts/remixicon.css";

const Navbar = function () {
  return (
    <nav className="bg-blue-500">
      <ul>
        <i class="ri-menu-line"></i>
        <i class="ri-remix-fill"></i>
        <li>
          <i class="ri-search-line"></i>
        </li>
      </ul>
      <ul>
        <li>login</li>
        <li>signup</li>
        <li>post</li>
      </ul>
    </nav>
  );
};

export default Navbar;
