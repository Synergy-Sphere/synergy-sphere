import { useEffect } from "react";
import { profileAvatar } from "../../../assets";
import { usePost } from "../../../hooks";
import { useEventContext } from "../../../contexts/eventContext/EventContext";

function OneEvent({
  _id: eventId,
  title,
  description,
  createdBy,
  createdAt,
  startDate,
  endDate,
  location,
  username,
  feedView,
  isOwner,
  getUserEvents
}) {

  const { fullName: creatorName, profilePic: creatorPic } = createdBy;

  const { eventDispatch } = useEventContext();

  return (
    <div className="w-[40%] flex flex-col justify-between rounded-r-lg border-2 border-blue-300 m-4 p-4 min-h-[30rem] ">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4 ">
          <img
            src={creatorPic || profileAvatar}
            alt=""
            className="w-8 h-8 rounded-full"
          />
          <span>{title}</span>
        </div>

        {/* {isOwner && (
          <button className="btn" onClick={handleDeletePost}>
            D
          </button>
        )} */}
      </div>

      <div className="flex justify-center">{description}</div>

    </div>
  );
}

export default OneEvent;