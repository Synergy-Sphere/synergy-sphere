import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../contexts/authContext/AuthContext";
import { usePostContext } from "../contexts/postContext/PostContext";

function usePost() {
  const [loading, setLoading] = useState(false);
  const { updateUser } = useAuthContext();

  const { postDispatch, GET_ALL_POSTS, ONE_USER_POSTS, GET_ONE_POST } =
    usePostContext();

  // (*) Create
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
  // (*) Delete
  async function deletePost(postId) {
    try {
      const settings = {
        method: "DELETE",
        credentials: "include",
      };

      const response = await fetch(
        `http://localhost:5555/post/delete/${postId}`,
        settings
      );

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      const { message } = await response.json();
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    }
  }

  // (*) Get All
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
  // (*) Get User's posts
  async function getUserPosts(username) {
    try {
      const response = await fetch(
        `http://localhost:5555/post/${username}/getUserPosts`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      postDispatch({ type: ONE_USER_POSTS, payload: data });
    } catch (error) {
      toast.error(error.message);
    }
  }

  // (*) Get one post
  async function getOnePost(postId) {
    try {
      const settings = {
        credentials: "include",
      };
      const response = await fetch(
        `http://localhost:5555/post/getOnePost/${postId}`,
        settings
      );

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();

      postDispatch({ type: GET_ONE_POST, payload: data });
    } catch (error) {
      toast.error(error.message);
    }
  }
  // (*) Give a like
  async function giveLike(postId, username) {
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

      if (username) {
        const filteredData = data.filter((x) => {
          return x.createdBy.username === username;
        });
        postDispatch({ type: ONE_USER_POSTS, payload: filteredData });
      } else {
        postDispatch({ type: GET_ALL_POSTS, payload: data });
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  // (*) Comment on a post
  async function commentOnPost(postId, commentContent) {
    // /addComment/:id/
    try {
      const settings = {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/json",
        },
        credentials: "include",
        body: JSON.stringify({ commentContent }),
      };

      const response = await fetch(
        `http://localhost:5555/post/addComment/${postId}`,
        settings
      );
    } catch (error) {
      toast.error(error.message);
    }
  }
  return {
    getAllPosts,
    getUserPosts,
    getOnePost,

    createPost,
    deletePost,

    giveLike,

    loading,
  };
}

export default usePost;
