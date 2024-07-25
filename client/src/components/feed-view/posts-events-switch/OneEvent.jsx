import { useEffect } from "react";
import { profileAvatar } from "../../../assets";
import { usePost } from "../../../hooks";
import { useEventContext } from "../../../contexts/eventContext/EventContext";
import { Link } from "react-router-dom";
import SinglePageEvent from "../../../views/SinglePageEvent";

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
  eventType,
  getUserEvents, deleteEvent
}) {

  const { fullName: creatorName, profilePic: creatorPic } = createdBy;

  const { eventDispatch } = useEventContext();

  async function handleDeleteEvent() {
    await deleteEvent(eventId);
    await getUserEvents(username);
  }

  return (
    <div className="w-[40%] flex flex-col justify-between items-center rounded-r-lg border-2 border-blue-300 m-4 p-4 min-h-[30rem] ">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4 ">
          {/* <img
            src={creatorPic || profileAvatar}
            alt=""
            className="w-8 h-8 rounded-full"
          /> */}
        </div>

        {isOwner && (
          <button className="btn" onClick={handleDeleteEvent}>
            D
          </button>
        )}
      </div>

        <span>{title}</span>
        <span>Hosted by: {createdBy.username}</span>
        <span>{startDate}</span>
      <div className="flex justify-center">{eventType && eventType.map((type, i) => (
        <span key={i}> {type} </span>
      ) )}</div>
     <Link to={`event/${eventId}`} element={<SinglePageEvent eventId={eventId}/>}>Read more</Link>
    </div>
  );
}

export default OneEvent;