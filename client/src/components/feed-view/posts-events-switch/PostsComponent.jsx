import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../contexts/authContext/AuthContext";
import { usePost } from "../../../hooks";
import { useEffect } from "react";
import { usePostContext } from "../../../contexts/postContext/PostContext";

function PostsComponent() {
  const { username } = useParams();

  const { loggedInUser } = useAuthContext();
  const { allPosts } = usePostContext();

  const { getAllPosts } = usePost();

  useEffect(() => {
    async function renderPosts() {
      await getAllPosts();
    }
    renderPosts();
  }, []);

  console.log("all posts -->", allPosts);
  // console.log("Post comp --> ", loggedInUser);
  // console.log(username);

  return (
    <>
      <h3 className=" text-2xl text-center uppercase ">Posts</h3>

      {allPosts?.map(x=>{
        return <div key={x._id} className="flex w-full justify-center m-4 border-2 border-gray-600">
          {x.content}
        </div>
      })}
    </>
  );
}

export default PostsComponent;
