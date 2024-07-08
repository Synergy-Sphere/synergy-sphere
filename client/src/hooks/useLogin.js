import { useState } from "react";
import toast from "react-hot-toast";

import { useAuthContext } from "../contexts/authContext/AuthContext";

function useLogin() {
  const [loading, setLoading] = useState(false);

  const { updateUser } = useAuthContext();

  async function loggingIn(email, password) {
    const valid = checkInputsValidations({
      email,
      password,
    });
    if (!valid) return;
    setLoading(true);

    try {
      const settings = {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "Application/json",
        },
        credentials: "include",
      };

      const response = await fetch("http://localhost:5555/login", settings);
      if (response.ok) {
        const data = await response.json();

        await updateUser(data);
      } else {
        const { error } = await response.json();
        console.log(error);
        throw new Error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, loggingIn };
}

export default useLogin;

function checkInputsValidations({ email, password }) {
  if (!email || !password) {
    toast.error("No empty fields");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
