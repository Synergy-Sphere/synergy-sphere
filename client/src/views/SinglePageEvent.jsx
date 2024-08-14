import { useEffect, useState } from "react";
import { profileAvatar } from "../assets";
import { useParams, useNavigate } from "react-router-dom";
import { useEvent } from "../hooks";
import { useEventContext } from "../contexts/eventContext/EventContext";
import { useAuthContext } from "../contexts/authContext/AuthContext";

const SinglePageEvent = ({isOwner}) => {
  const nav = useNavigate();
  const { eventId } = useParams();

  
  const { getSingleEvent, joinEvent, declineEvent } = useEvent();
  const { singleEvent, eventDispatch } = useEventContext();
  const { loggedInUser } = useAuthContext();
  const [quantityOfTickets, setQuantityOfTickets] = useState("");


  const isEventOwner = loggedInUser._id === singleEvent?.createdBy._id;

  console.log(isEventOwner);
  

  const isParticipant = singleEvent?.participants?.find(
    (participant) => participant._id === loggedInUser._id
  );

  useEffect(() => {
    async function renderSingleEvent() {
      await getSingleEvent(eventId);
    }
    renderSingleEvent();
  }, []);

  console.log(singleEvent);

  return (
    <div className="flex flex-col items-center gap-6">
      <div>
        <p>{singleEvent?.title}</p>
        <div>
          <img
            src={singleEvent?.createdBy.profilePic || profileAvatar}
            alt=""
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p>Hosted By</p>
            <p>{singleEvent?.createdBy.fullName}</p>
          </div>
        </div>
      </div>
      <div>
        {/* <img src="" alt="" /> */}
        <p>Description</p>
        <p>{singleEvent?.description}</p>
      </div>
      <div>
        {singleEvent?.eventType.map((type, i) => (
          <span key={i}>{type}</span>
        ))}
      </div>
      <div>
        Attendees ({singleEvent?.participants?.length})
        {singleEvent?.participants &&
          singleEvent?.participants?.map((participant) => (
            <div>
              <img
                src={participant.profilePic || profileAvatar}
                alt=""
                className="w-10"
              />
              <p>{participant.fullName}</p>
            </div>
          ))}
      </div>
      <div>
        <div>
          <p>{singleEvent?.startDate}</p>
          <p>{singleEvent?.title}</p>
        </div>
         {isParticipant && !isEventOwner && !singleEvent?.isPaid ? (
          <button onClick={() => declineEvent(eventId)}>Decline</button>
        ) : singleEvent?.isPaid && !isEventOwner && !isParticipant ? (
          <div>
            Please note this event is paid.
            {/* <input
              type="text"
              placeholder="Number of tickets..."
              value={quantityOfTickets}
              onChange={(e) => setQuantityOfTickets(e.target.value)}
            /> */}
            <button
              onClick={() =>
                nav(`/${eventId}/checkout`, {
                  state: { eventId },
                })
              }
            >
              Confirm
            </button>
          </div>
        ) : !isEventOwner && !isParticipant ? (
          <button onClick={() => joinEvent(eventId)}>Attend</button>
        ) : null}
      </div>
    </div>
  );
};

export default SinglePageEvent;
