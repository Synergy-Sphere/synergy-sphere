import { useEventContext } from "../contexts/eventContext/EventContext";
import toast from "react-hot-toast";

function useEvent() {
  const { eventDispatch, GET_ALL_EVENTS } = useEventContext();

  async function getAllEvents() {
    try {
      const response = await fetch("http://localhost:5555/event/getEvents", {
        credentials: "include",
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      eventDispatch({type: GET_ALL_EVENTS, payload:data});
    } catch (error) {
        toast.error(error.message);
    }
  }
  return {getAllEvents};
}

export default useEvent;
