export const POST_TYPES = {
  TEXT_AREA: "text-area",
  GET_ALL_POSTS: "get-all-posts",
  ONE_USER_POSTS: "one-user-posts",
  SHOW_CREATE_POST_POPUP: "show-create-post-popup"
};

export const postInitialState = {
  content: "",
  allPosts: null,
  oneUserPosts: null,

  showPopup: false
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
    case POST_TYPES.ONE_USER_POSTS: {
      return {
        ...postState,
        oneUserPosts: payload,
      };
    }
    case POST_TYPES.SHOW_CREATE_POST_POPUP:{
      return {
        ...postState,
        showPopup: payload
      }
    }
    default: {
      return userState;
    }
  }
}
