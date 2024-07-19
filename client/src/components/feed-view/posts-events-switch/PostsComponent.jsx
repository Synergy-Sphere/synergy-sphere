import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../contexts/authContext/AuthContext";
import { usePost } from "../../../hooks";
import { useEffect } from "react";
import { usePostContext } from "../../../contexts/postContext/PostContext";
import OnePost from "./OnePost";

function PostsComponent({ isOwner, feedView }) {
  const { username } = useParams();

  const { loggedInUser } = useAuthContext();
  const {
    allPosts,
    oneUserPosts,
    postDispatch,
    showPopup,
    GET_ALL_POSTS,
    ONE_USER_POSTS,
    SHOW_CREATE_POST_POPUP,
  } = usePostContext();

  const { getAllPosts, getUserPosts, giveLike, deletePost, getOnePost } =
    usePost();

  useEffect(() => {
    async function renderAllPosts() {
      await getAllPosts();
    }

    async function renderOneUserPosts() {
      await getUserPosts(username);
    }
    username ? renderOneUserPosts() : renderAllPosts();

    return () => {
      postDispatch({ type: GET_ALL_POSTS, payload: null });

      postDispatch({ type: ONE_USER_POSTS, payload: null });
    };
        // herr Bakumenko added username
  }, [showPopup, username]);

  // console.log("one user's posts --> ", oneUserPosts);
  // console.log("all posts --> ", allPosts);
  // console.log("Post comp --> ", loggedInUser);
  // console.log(username);

  return (
    <>
      <h3 className=" text-2xl text-center uppercase ">Posts</h3>

      {isOwner && (
        <div className="w-[85%] mx-auto mt-8">
          <button
            className="btn w-full justify-start pl-8 text-xl font-normal"
            onClick={() =>
              postDispatch({ type: SHOW_CREATE_POST_POPUP, payload: true })
            }
          >
            Share your thoughts...
          </button>
        </div>
      )}

      <div className="flex flex-col items-center">
        {username
          ? oneUserPosts &&
            oneUserPosts.map((x) => {
              return (
                <OnePost
                  {...x}
                  key={x._id}
                  username={username}
                  giveLike={giveLike}
                  isOwner={isOwner}
                  deletePost={deletePost}
                  getUserPosts={getUserPosts}
                />
              );
            })
          : allPosts &&
            allPosts.map((x) => {
              return (
                <OnePost
                  {...x}
                  key={x._id}
                  giveLike={giveLike}
                  feedView={feedView}

                  getOnePost={getOnePost}
                />
              );
            })}
      </div>
    </>
  );
}

export default PostsComponent;
