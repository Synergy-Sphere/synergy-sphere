import { useEventContext } from "../../../contexts/eventContext/EventContext";
import useEvent from "../../../hooks/useEvent";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import OneEvent from "./OneEvent";

function EventsComponent({ isOwner, feedView }) {
  const { id: loggedInUserId, username } = useParams();

  const {
    allEvents,
    oneUserEvents,
    suggestedEvents,
    eventDispatch,
    GET_ALL_EVENTS,
    ONE_USER_EVENTS,
    GET_SUGGESTED_EVENTS,
  } = useEventContext();

  const { getAllEvents, getUserEvents, getSuggestedEvents, deleteEvent } = useEvent();

  useEffect(() => {
    async function renderAllEvents() {
      await getAllEvents();
    }

    async function renderOneUserEvents() {
      await getUserEvents(username);
    }

    async function renderSuggestedEvents() {
      await getSuggestedEvents(loggedInUserId);
    }

    username ? renderOneUserEvents() : renderSuggestedEvents();

    return () => {
      eventDispatch({ type: GET_ALL_EVENTS, payload: null });

      eventDispatch({ type: ONE_USER_EVENTS, payload: null });

      eventDispatch({ type: GET_SUGGESTED_EVENTS, payload: null });
    };
  }, [username]);

  console.log("all events-->", allEvents);
  return (
    <>
      <h3 className=" text-2xl text-center uppercase ">Events</h3>
     {isOwner && <Link to={`createEvent`}>Create Event</Link>}
      <div className="flex flex-wrap justify-around items-center">
        {username
          ? oneUserEvents &&
            oneUserEvents?.map((x) => {
              return (
                <OneEvent
                  {...x}
                  key={x._id}
                  username={username}
                  isOwner={isOwner}
                  getUserEvents={getUserEvents}
                  deleteEvent={deleteEvent}
                />
              );
            })
          : suggestedEvents &&
            suggestedEvents.map((x) => {
              return <OneEvent {...x} key={x._id} feedView={feedView} />;
            })}
      </div>
    </>
  );
}

export default EventsComponent;
