import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../../contexts/authContext/AuthContext";

import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import { profileAvatar } from "../../assets";

function Navbar() {
  const nav = useNavigate();
  const { loggedInUser, updateUser } = useAuthContext();

  function handleLogout() {
    updateUser(null);
    nav("/");
  }

  return (
    <nav className="w-full mt-4 mb-8 flex justify-between items-center">
      <Link to="/" className="ml-8 text-xl text-blue-600">
        Synergy Sphere
      </Link>
      <ul className="flex justify-between items-center gap-10 w-[50%] mr-8">
        <li>
          <Link
            to={`${loggedInUser.username}`}
            className="flex justify-center items-center gap-6"
          >
            {/* <Avatar
              alt=""
              src={loggedInUser.profilePic}
              // sx={{ width: 56, height: 56 }}
            /> */}
            <img
              src={loggedInUser.profilePic || profileAvatar}
              alt=""
              className="w-6 lg:w-14 h-6 lg:h-14"
            />
            <span>{loggedInUser.fullName}</span>
          </Link>
        </li>

        <li>
          <button className="" onClick={handleLogout}>
            <LogoutIcon />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
