import { profileAvatar } from "../../assets";
import { useAuthContext } from "../../contexts/authContext/AuthContext";
import { usePostContext } from "../../contexts/postContext/PostContext";
import { usePost } from "../../hooks";

function OnePostPopup() {
  const { loggedInUser } = useAuthContext();
  const { onePost, SHOW_ONE_POST_POPUP, GET_ONE_POST, postDispatch } =
    usePostContext();

  // Use for rendering -->
  const { getOnePost } = usePost();


  const { fullName: loggedInUserFullName, profilePic: loggedInUserProfilePic } =
    loggedInUser;

    
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

  function handleCloseOnePostPopup() {
    postDispatch({ type: SHOW_ONE_POST_POPUP, payload: false });
    postDispatch({ type: GET_ONE_POST, payload: null });
  }

  function handleCommenting(e) {
    e.preventDefault();
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

        <div className="w-full">{postContent} </div>
      </div>

      <form onSubmit={handleCommenting} className=" w-full flex  gap-4 ">
        <img
          src={loggedInUserProfilePic || profileAvatar}
          alt=""
          className="w-8 h-8 rounded-full"
        />
        {/* <span>{loggedInUserFullName}</span> */}

        <div className="flex-grow relative">
          <input type="text" className=" w-full input " />
          <button
            type="submit"
            className="hover:bg-green-200 absolute bottom-0 right-0 h-7 w-6 font-bold"
            //   disabled={content.length === 0}
          >
            {"->"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default OnePostPopup;
