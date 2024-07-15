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
}) {
  const { fullName: creatorName, profilePic: creatorPic } = createdBy;

  const { giveLike } = usePost();

  async function handleLiking() {
    await giveLike(postId);
  }
  return (
    <div className="w-[85%] flex flex-col justify-between rounded-r-lg border-2 border-blue-300 m-4 p-4 min-h-[20rem] ">
      <div className="flex items-center gap-4 border-b">
        <img
          src={creatorPic || profileAvatar}
          alt=""
          className="w-8 h-8 rounded-full"
        />
        <span>{creatorName}</span>
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
