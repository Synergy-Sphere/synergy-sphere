import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../contexts/authContext/AuthContext";

function useCreatePost() {
  const [loading, setLoading] = useState(false);
  const { updateUser } = useAuthContext();

  async function posting(content) {
    setLoading(true);

    try {
      const settings = {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        credentials: "include",
        body: JSON.stringify({ content, images: "" }),
      };
      const response = await fetch(
        "http://localhost:5555/post/create",
        settings
      );

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();

      updateUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function getAllPosts() {
    try {
      const response = await fetch("http://localhost:5555/post/getPosts", {
        credentials: "include",
      });
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();

      // todo --> postsContext
    } catch (error) {
      toast.error(error.message);
    }
  }

  return { posting, loading };
}

export default useCreatePost;
