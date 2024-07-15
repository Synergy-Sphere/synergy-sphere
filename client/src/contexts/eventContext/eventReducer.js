export const EVENT_TYPES = {
  GET_ALL_EVENTS: "get-all-events",
};

export const eventInitialState = {
  allEvents: null,
};

export function eventReducer(eventState, { type, payload }) {
  switch (type) {
    case EVENT_TYPES.GET_ALL_EVENTS: {
      return {
        ...eventState,
        allEvents: payload,
      };
    }

    default: {
      return eventState;
    }
  }
}
