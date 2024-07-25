import { useEffect, useState } from "react";
import { profileAvatar } from "../assets";
import { useParams } from "react-router-dom";

const SinglePageEvent = () => {
  const [singleEventInfo, setSingleEventInfo] = useState(null);

  const {eventId} = useParams();

  useEffect(() => {
    async function getSingleEvent() {
      const response = await fetch(`http://localhost:5555/event/${eventId}`, {
        credentials: "include",
      });
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      console.log(data);
      setSingleEventInfo(data);
    }
    getSingleEvent();
  }, []);

  return (
    <div>
      <div>
        <p>{singleEventInfo?.title}</p>
        <div>
          <img
            src={singleEventInfo?.createdBy.profilePic || profileAvatar}
            alt=""
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p>Hosted By</p>
            <p>{singleEventInfo?.createdBy.fullName}</p>
          </div>
        </div>
      </div>
      <div>
        {/* <img src="" alt="" /> */}
        <p>Description</p>
        <p>{singleEventInfo?.description}</p>
      </div>
      <div>{singleEventInfo?.eventType.map((type, i) => (
        <span>{type}</span>
      ))}</div>
      <div>
        Attendees ({singleEventInfo?.participants.length})
        {singleEventInfo?.participants && singleEventInfo?.participants.map(participant => (
            <div>
                <img src={participant.profilePic || profileAvatar} alt="" />
                <p>{participant.fullName}</p>
            </div>
        ) )}
        </div>
        <div>
            <div>
                <p>{singleEventInfo?.startDate}</p>
                <p>{singleEventInfo?.title}</p>
            </div>
            <button>Attend</button>
        </div>
    </div>
  );
};

export default SinglePageEvent;
