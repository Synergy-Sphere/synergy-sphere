import { useEventContext } from "../../../contexts/eventContext/EventContext";
import useEvent from "../../../hooks/useEvent";
import { useEffect } from "react";

function EventsComponent() {
  const { allEvents } = useEventContext();
  const { getAllEvents } = useEvent();

  useEffect(() => {
    async function renderEvents() {
      await getAllEvents();
    }
    renderEvents();
  }, []);

  console.log("all events-->", allEvents);
  return (
    <>
      <h3 className=" text-2xl text-center uppercase ">Events</h3>

      {allEvents?.map(x=>{
        return <div key={x.id} className="flex flex-col w-full justify-center m-4 border-2 border-gray-600">
          <p>Title: {x.title}</p>
          <p>Description: {x.description}</p>
          <p>Location: {x.location}</p>
          <p>Start date : {x.startDate}</p>
          <p>End date : {x.endDate}</p>
          <p>{x.eventType}</p>
        </div>
      })}
    </>
  );
}

export default EventsComponent;
