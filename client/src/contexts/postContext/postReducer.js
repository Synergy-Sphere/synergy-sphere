export const POST_TYPES = {
  TEXT_AREA: "text-area",
  GET_ALL_POSTS: "get-all-posts",
};

export const postInitialState = {
  content: "",
  allPosts: null,
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
    case POST_TYPES.GET_ALL_POSTS: {
      return {
        ...postState,
        allPosts: payload,
      };
    }
    default: {
      return userState;
    }
  }
}
