import { useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuthContext } from "../../contexts/authContext/AuthContext";

import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar() {
  const nav = useNavigate();
  const { loggedInUser, updateUser } = useAuthContext();
  const { id } = useParams();

  function handleLogout() {
    updateUser(null);
    nav("/");
  }

  return (
    <nav className="w-full mt-4 mb-8">
      <ul className="flex justify-between items-center gap-10 w-[80em] mx-auto">
        <li>
          <Link
            to={`/${id}/feed/${loggedInUser.username}`}
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
