import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { profileAvatar } from "../../assets";

function OneComment({
  postId,
  loggedInUserId,

  _id: commentId,
  commentedBy,
  content,
  createdAt: commentDateInfo,
  likes: commentLikesArr,

  addLikesToComment,
  deleteOneComment,
}) {
  const isOwner = loggedInUserId === commentedBy._id;

  async function LikeOneComment() {
    await addLikesToComment(postId, commentId);
  }

  async function handleDeleteComment() {
    await deleteOneComment(commentId);
  }

  return (
    <div className="flex gap-2 m-2 ">
      <img
        src={commentedBy.profilePic || profileAvatar}
        alt=""
        className=" w-8 h-8 rounded-full"
      />

      <div className=" w-full">
        <div className=" p-2 rounded-lg bg-gray-200">
          <div className="flex justify-between items-center">
            <span className=" font-bold">{commentedBy.fullName}</span>
            {isOwner && (
              <button
                className=" bg-blue-500 hover:bg-red-500 w-8 text-white font-bold rounded-lg"
                onClick={handleDeleteComment}
              >
                D
              </button>
            )}
          </div>
          <div className="w-full">{content}</div>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-4">
            <button className=" hover:text-blue-400" onClick={LikeOneComment}>
              Like
            </button>
            <span>{commentLikesArr.length > 0 && commentLikesArr.length}</span>
          </div>
          <span>
            {formatDistanceToNow(new Date(commentDateInfo), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OneComment;
