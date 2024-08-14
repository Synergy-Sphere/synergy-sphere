export const EVENT_TYPES = {
  GET_ALL_EVENTS: "get-all-events",
  ONE_USER_EVENTS: "one-user-events",
  GET_SUGGESTED_EVENTS: "get-suggested-events",
  GET_SINGLE_EVENT: "get-single-event"
};

export const eventInitialState = {
  allEvents: null,
  oneUserEvents: null,
  suggestedEvents:null,
  singleEvent:null,
};



export function eventReducer(eventState, { type, payload }) {
  switch (type) {
    case EVENT_TYPES.GET_ALL_EVENTS: {
      return {
        ...eventState,
        allEvents: payload,
      };
    }
    case EVENT_TYPES.ONE_USER_EVENTS: {
      return {
        ...eventState,
        oneUserEvents: payload,
      };
    }
    case EVENT_TYPES.GET_SUGGESTED_EVENTS: {
      return {
        ...eventState,
        suggestedEvents: payload,
      };
    }

    case EVENT_TYPES.GET_SINGLE_EVENT: {
      return {
        ...eventState,
        singleEvent: payload
      }
    }

    default: {
      return eventState;
    }
  }
}
