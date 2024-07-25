import { useEffect } from "react";
import { profileAvatar } from "../../assets";
import { useAuthContext } from "../../contexts/authContext/AuthContext";
import { usePostContext } from "../../contexts/postContext/PostContext";
import { usePost } from "../../hooks";

import OneComment from "../posts/OneComment";

function OnePostPopup() {
  const { loggedInUser } = useAuthContext();
  const {
    onePost,
    commentInput,
    allComments,
    SHOW_ONE_POST_POPUP,
    GET_ONE_POST,
    COMMENT_INPUT,
    postDispatch,
  } = usePostContext();

  // Use for rendering -->
  const {
    getOnePost,
    commentOnPost,
    addLikesToComment,
    getOneComment,
    getAllComments,
    deleteOneComment,
  } = usePost();

  const {
    _id: loggedInUserId,
    fullName: loggedInUserFullName,
    profilePic: loggedInUserProfilePic,
  } = loggedInUser;

  const {
    _id: postId,
    createdBy: {
      _id: creatorId,
      fullName: postCreatorFullName,
      profilePic: postCreatorProfilePic,
    } = {},
    content: postContent,
    createdAt,
    comments,
    likes,
    images,
  } = onePost || {};

  useEffect(() => {
    async function renderAllComments() {
      onePost && (await getAllComments(postId));
    }
    renderAllComments();
  }, [comments, deleteOneComment]);

  function handleCloseOnePostPopup() {
    postDispatch({ type: SHOW_ONE_POST_POPUP, payload: false });
    postDispatch({ type: GET_ONE_POST, payload: null });
  }

  async function handleCommenting(e) {
    e.preventDefault();
    await commentOnPost(postId, commentInput);
    postDispatch({ type: COMMENT_INPUT, payload: "" });
  }
  return (
    <div className=" w-[40%] h-[75%] p-8 bg-yellow-200 border border-black flex flex-col justify-between">
      <div className="relative border-b border-gray-400 ">
        <h4 className=" text-center text-2xl font-bold  mb-4">
          {postCreatorFullName}'s Post
        </h4>

        <button
          className="btn rounded-full absolute right-0 top-[-.7rem] bg-red-300 text-3xl"
          onClick={handleCloseOnePostPopup}
        >
          &times;
        </button>
      </div>
      <div className="w-full h-full m-2 overflow-y-scroll">
        <div className=" flex justify-start items-center m-4 gap-4">
          <img
            src={postCreatorProfilePic || profileAvatar}
            alt=""
            className=" w-12 h-12 rounded-full"
          />
          <span>{postCreatorFullName}</span>
        </div>

        <div className="w-full h-[70%]">{postContent} </div>

        <div>
          {allComments &&
            allComments
              .sort((a, b) => {
                const earlyComment = new Date(a.createdAt).getTime();

                const lateComment = new Date(b.createdAt).getTime();
                if (earlyComment > lateComment) return -1;
                else if (earlyComment < lateComment) return 1;
                else return 0;
              })
              .map((x) => {
                return (
                  <OneComment
                    key={x._id}
                    {...x}
                    loggedInUserId={loggedInUserId}
                    getOneComment={getOneComment}
                    addLikesToComment={addLikesToComment}
                    postId={postId}
                    deleteOneComment={deleteOneComment}
                  />
                );
              })}
        </div>
      </div>

      <form onSubmit={handleCommenting} className=" w-full flex  gap-4 ">
        <img
          src={loggedInUserProfilePic || profileAvatar}
          alt=""
          className="w-8 h-8 rounded-full"
        />

        <div className="flex-grow relative">
          <input
            type="text"
            className=" w-full input "
            value={commentInput}
            onChange={({ target }) =>
              postDispatch({ type: COMMENT_INPUT, payload: target.value })
            }
          />
          <button
            type="submit"
            className="hover:bg-green-200 absolute bottom-0 right-0 h-7 w-6 font-bold"
            disabled={commentInput.length === 0}
          >
            {"->"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default OnePostPopup;
