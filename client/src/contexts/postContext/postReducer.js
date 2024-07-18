export const POST_TYPES = {
  TEXT_AREA: "text-area",

  GET_ALL_POSTS: "get-all-posts",
  ONE_USER_POSTS: "one-user-posts",

  GET_ONE_POST: "get-one-post",

  SHOW_CREATE_POST_POPUP: "show-create-post-popup",
  SHOW_ONE_POST_POPUP: "show-comments-popup",
};

export const postInitialState = {
  content: "",
  allPosts: null,
  oneUserPosts: null,

  onePost: null,

  showPopup: false,
  commentsPopup: false,
};

export function postReducer(postState, { type, payload }) {
  switch (type) {
    // * Text area input
    case POST_TYPES.TEXT_AREA: {
      return {
        ...postState,
        content: payload,
      };
    }

    // * Get
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
    case POST_TYPES.GET_ONE_POST: {
      return {
        ...postState,
        onePost: payload,
      };
    }

    // * Show popups
    case POST_TYPES.SHOW_CREATE_POST_POPUP: {
      return {
        ...postState,
        showPopup: payload,
      };
    }
    case POST_TYPES.SHOW_ONE_POST_POPUP: {
      return {
        ...postState,
        commentsPopup: payload,
      };
    }

    default: {
      return userState;
    }
  }
}
