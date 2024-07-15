import { createContext, useContext, useReducer } from "react";

import { EVENT_TYPES, eventInitialState, eventReducer } from "./eventReducer";

const EventContext = createContext();

export function useEventContext() {
  return useContext(EventContext);
}

function EventContextProvider({ children }) {
  const [eventState, eventDispatch] = useReducer(
    eventReducer,
    eventInitialState
  );

  return (
    <EventContext.Provider
      value={{ ...eventState, ...EVENT_TYPES, eventDispatch }}
    >
      {children}
    </EventContext.Provider>
  );
}

export default EventContextProvider;
