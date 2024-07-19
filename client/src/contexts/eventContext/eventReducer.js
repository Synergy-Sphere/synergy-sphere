export const EVENT_TYPES = {
  GET_ALL_EVENTS: "get-all-events",
  ONE_USER_EVENTS: "one-user-events"
};

export const eventInitialState = {
  allEvents: null,
  oneUserEvents: null
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

    default: {
      return eventState;
    }
  }
}
