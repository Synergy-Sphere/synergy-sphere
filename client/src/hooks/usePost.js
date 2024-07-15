import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../contexts/authContext/AuthContext";
import { usePostContext } from "../contexts/postContext/PostContext";

function usePost() {
  const [loading, setLoading] = useState(false);
  const { updateUser } = useAuthContext();

  const { postDispatch, GET_ALL_POSTS } = usePostContext();

  async function createPost(content) {
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

      postDispatch({ type: GET_ALL_POSTS, payload: data });
      // console.log(data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function giveLike(postId) {
    try {
      const settings = {
        method: "PATCH",
        credentials: "include",
      };

      const response = await fetch(
        `http://localhost:5555/post/like/${postId}`,
        settings
      );

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();

      postDispatch({ type: GET_ALL_POSTS, payload: data });
    } catch (error) {
      toast.error(error.message);
    }
  }
  return { createPost, getAllPosts, giveLike, loading };
}

export default usePost;
