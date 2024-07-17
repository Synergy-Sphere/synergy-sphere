import { useEffect } from "react";
import { profileAvatar } from "../../../assets";
import { usePost } from "../../../hooks";
import { usePostContext } from "../../../contexts/postContext/PostContext";

function OnePost({
  _id: postId,
  content,
  createdBy,
  createdAt,
  comments,
  likes,
  giveLike,
  username,

  isOwner,
  deletePost,

  getUserPosts
}) {
  const { fullName: creatorName, profilePic: creatorPic } = createdBy;

  async function handleLiking() {
    await giveLike(postId, username);
  }

  async function handleDeletePost() {
    await deletePost(postId);
    await getUserPosts(username)
  }
  return (
    <div className="w-[85%] flex flex-col justify-between rounded-r-lg border-2 border-blue-300 m-4 p-4 min-h-[20rem] ">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4 ">
          <img
            src={creatorPic || profileAvatar}
            alt=""
            className="w-8 h-8 rounded-full"
          />
          <span>{creatorName}</span>
        </div>

        {isOwner && (
          <button className="btn" onClick={handleDeletePost}>
            D
          </button>
        )}
      </div>

      <div className="flex justify-center">{content}</div>

      <div className="pt-2 border-t flex justify-around">
        <div>
          <button onClick={handleLiking}>
            {likes.length > 0 && likes.length} Likes
          </button>

          <span>
            {
              // onHover show a list of how likes th post "absolutely positioned" likes.map(x=> <ul>x.fullName)
            }
          </span>
        </div>
        <div>comments</div>
      </div>
    </div>
  );
}

export default OnePost;
