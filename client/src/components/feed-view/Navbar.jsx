import { useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuthContext } from "../../contexts/authContext/AuthContext";

import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar() {
  const nav = useNavigate();
  const { loggedInUser, updateUser } = useAuthContext();
  const { id } = useParams();

  // ! Try to fix the nav
  // * worked -- nav to the the logged in user profile

  function handleLogout() {
    updateUser(null);
    nav("/");
  }

  return (
    <nav className="w-full mt-4 mb-8 flex justify-between items-center">
      <Link
        // to={`/${id}/feed`}
        to="/"
        className="ml-8 text-2xl text-blue-600"
      >
        Synergy Sphere
      </Link>
      <ul className="flex justify-between items-center gap-10 w-[50%] mr-8">
        <li>
          <Link
            // to={`/${id}/feed/${loggedInUser.username}`}
            to={`${loggedInUser.username}`}
            className="flex justify-center items-center gap-6"
          >
            <Avatar
              alt=""
              src={loggedInUser.profilePic}
              sx={{ width: 56, height: 56 }}
            />
            <span>{loggedInUser.fullName}</span>
          </Link>
        </li>
        <li>
          <Link>Messenger</Link>
        </li>
        <li>
          <button className="btn" onClick={handleLogout}>
            <LogoutIcon />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
