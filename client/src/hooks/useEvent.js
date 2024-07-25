import { useEventContext } from "../contexts/eventContext/EventContext";
import toast from "react-hot-toast";

function useEvent() {
  const { eventDispatch, GET_ALL_EVENTS, ONE_USER_EVENTS, GET_SUGGESTED_EVENTS } = useEventContext();

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

  async function getUserEvents(username) {
    try {
      const response = await fetch(
        `http://localhost:5555/event/${username}/getUserEvents`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      eventDispatch({ type: ONE_USER_EVENTS, payload: data });
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function getSuggestedEvents(id) {
    try {
      const response = await fetch(`http://localhost:5555/event/${id}/getSuggestedEvents`, {
        credentials: "include",
      });

      if (!response.ok) {
        const {error} = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      eventDispatch({type: GET_SUGGESTED_EVENTS, payload: data});
    } catch (error) {
      toast.error(error.message)
    }
  }

  async function deleteEvent(eventId) {
    try {
      const settings = {
        method: "DELETE",
        credentials: "include",
      };

      const response = await fetch(
        `http://localhost:5555/event/delete/${eventId}`,
        settings
      );

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      const { message } = await response.json();
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    }
  }


  return {getAllEvents, getUserEvents, getSuggestedEvents, deleteEvent};
}

export default useEvent;
