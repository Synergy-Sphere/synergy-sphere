import { useState } from "react";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext/AuthContext";

function useSignup() {
  const [loading, setLoading] = useState(false);

  const { updateUser } = useAuthContext();

  const nav = useNavigate();

  async function signingUp({
    fullName,
    username,
    email,
    password,
    confirmPassword,
  }) {
    const valid = checkInputsValidations({
      fullName,
      username,
      email,
      password,
      confirmPassword,
    });
    if (!valid) return;

    setLoading(true);

    try {
      const settings = {
        method: "POST",
        body: JSON.stringify({
          fullName,
          username,
          email,
          password,
          confirmPassword,
        }),
        headers: {
          "Content-Type": "Application/json",
        },
        credentials: "include",
      };
      const response = await fetch("http://localhost:5555/signup", settings);

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      await updateUser(data);

      const userId = data._id;
      nav(`/${userId}/customize-profile`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, signingUp };
}

export default useSignup;

function checkInputsValidations({
  fullName,
  username,
  email,
  password,
  confirmPassword,
}) {
  if (!fullName || !username || !email || !password || !confirmPassword) {
    toast.error("No empty fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords don't match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
