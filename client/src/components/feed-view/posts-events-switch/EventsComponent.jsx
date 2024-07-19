import { useEventContext } from "../../../contexts/eventContext/EventContext";
import useEvent from "../../../hooks/useEvent";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import OneEvent from "./OneEvent";

function EventsComponent({ isOwner, feedView }) {
  const { username } = useParams();

  const {
    allEvents,
    oneUserEvents,
    eventDispatch,
    GET_ALL_EVENTS,
    ONE_USER_EVENTS,
  } = useEventContext();

  const { getAllEvents, getUserEvents } = useEvent();

  useEffect(() => {
    async function renderAllEvents() {
      await getAllEvents();
    }

    async function renderOneUserEvents() {
      await getUserEvents(username);
    }

    username ? renderOneUserEvents() : renderAllEvents();

    return () => {
      eventDispatch({ type: GET_ALL_EVENTS, payload: null });

      eventDispatch({ type: ONE_USER_EVENTS, payload: null });
    };
  }, [username]);

  console.log("all events-->", allEvents);
  return (
    <>
      <h3 className=" text-2xl text-center uppercase ">Events</h3>

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
                />
              );
            })
          : allEvents &&
            allEvents.map((x) => {
              return <OneEvent {...x} key={x._id} feedView={feedView} />;
            })}
      </div>
    </>
  );
}

export default EventsComponent;
