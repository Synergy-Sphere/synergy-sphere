import { useNavigate } from "react-router-dom";
import { useRegisterContext } from "../contexts/registerContext/RegisterContext";

function LogoutButton() {
  const nav = useNavigate()
  const { registerDispatch, REGISTER_TYPES } = useRegisterContext();
  function handleLogout() {
    registerDispatch({ type: REGISTER_TYPES.USER_LOG_OUT });
    localStorage.removeItem("loggedInUser");
    nav("/")
  }
  return (
    <button className="btn" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
