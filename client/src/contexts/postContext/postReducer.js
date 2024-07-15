export const POST_TYPES = {
  TEXT_AREA: "text-area",
};

export const postInitialState = {
  content: "",
};

export function postReducer(postState, { type, payload }) {
  switch (type) {
    // Cases
    case POST_TYPES.TEXT_AREA: {
      return {
        ...postState,
        content: payload,
      };
    }
    default: {
      return userState;
    }
  }
}
