import { useNavigate } from "react-router-dom";
import { useRegisterContext } from "../contexts/registerContext/RegisterContext";
import { useAuthContext } from "../contexts/authContext/AuthContext";

function LogoutButton() {
  const nav = useNavigate();

  const { updateUser } = useAuthContext();
  function handleLogout() {
    updateUser(null);
    nav("/");
  }
  return (
    <button className="btn" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
