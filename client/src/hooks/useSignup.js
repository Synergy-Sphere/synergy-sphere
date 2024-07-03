import { useState } from "react";
import toast from "react-hot-toast";

import { useRegisterContext } from "../contexts/registerContext/RegisterContext";

function useSignup() {
  const [loading, setLoading] = useState(false);
  const {  registerDispatch, REGISTER_TYPES } = useRegisterContext();
  

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
      if (response.ok) {
        const data = await response.json();
        registerDispatch({
          type: REGISTER_TYPES.ASSIGN_LOGGED_IN_USER,
          payload: data,
        });
      }else {
        const { error } = await response.json()
        throw new Error(error.message)
      }
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
