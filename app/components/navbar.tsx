import React from "react";
import Link from "next/link";
import Theme from "./theme";
import LoginButton from "../auth/loginButton";

const Navbar = () => {
  return (
    <div className="flex gap-6 items-center">
      <LoginButton />
      <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
        <li>
          <Link style={{ marginRight: "10px" }} href="/">
            Home
          </Link>
        </li>
        <li>
          <Link href="/users">Users</Link>
        </li>
      </ul>
      <Theme />
    </div>
  );
};

export default Navbar;
