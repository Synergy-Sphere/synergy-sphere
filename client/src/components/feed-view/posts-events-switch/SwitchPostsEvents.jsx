import { useState } from "react";

import PostsComponent from "./PostsComponent";
import EventsComponent from "./EventsComponent";

function SwitchPostsEvents({ isOwner, feedView }) {
  const [showEvents, setShowEvents] = useState(false);
  return (
    <>
      <div className="flex justify-between items-center font-bold">
        <button
          className="m-2 w-40 text-xl  focus:text-emerald-600"
          onClick={() => setShowEvents(true)}
        >
          Events
        </button>
        <button
          className="m-2 w-40 text-xl focus:text-emerald-600"
          onClick={() => setShowEvents(false)}
        >
          Posts
        </button>
      </div>
      {showEvents ? <EventsComponent isOwner={isOwner} feedView={feedView} /> : <PostsComponent isOwner={isOwner} feedView={feedView}/>}
    </>
  );
}

export default SwitchPostsEvents;
