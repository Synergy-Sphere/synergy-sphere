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
    <nav>
      <ul className="flex justify-center items-center gap-8">
        <li>
          <Link to={`/${id}/feed/${loggedInUser.username}`}>
            <Avatar
              alt=""
              src={loggedInUser.profilePic}
              sx={{ width: 56, height: 56 }}
            />
          </Link>
        </li>
        <li>
          <Link>Messenger</Link>
        </li>
        <li>
          <button className="btn"
          onClick={handleLogout}
          >

            <LogoutIcon />
          </button>
        
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
