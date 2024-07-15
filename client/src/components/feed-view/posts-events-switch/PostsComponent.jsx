import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../contexts/authContext/AuthContext";
import { usePost } from "../../../hooks";
import { useEffect } from "react";
import { usePostContext } from "../../../contexts/postContext/PostContext";
import OnePost from "./OnePost";

function PostsComponent() {
  const { username } = useParams();

  const { loggedInUser } = useAuthContext();
  const { allPosts, postDispatch } = usePostContext();

  const { getAllPosts, giveLike } = usePost();

  useEffect(() => {
    async function renderPosts() {
      await getAllPosts();
    }
    renderPosts();
  }, []);

  // console.log("all posts -->", allPosts);
  // console.log("Post comp --> ", loggedInUser);
  // console.log(username);

  return (
    <>
      <h3 className=" text-2xl text-center uppercase ">Posts</h3>

      <div className="flex flex-col items-center">
        {allPosts &&
          allPosts.map((x) => {
            return <OnePost key={x._id} {...x} />;
          })}
      </div>
    </>
  );
}

export default PostsComponent;
