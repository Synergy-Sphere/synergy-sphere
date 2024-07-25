export const POST_TYPES = {
  TEXT_AREA: "text-area",
  COMMENT_INPUT: "comment-input",

  GET_ALL_POSTS: "get-all-posts",
  ONE_USER_POSTS: "one-user-posts",

  GET_ONE_POST: "get-one-post",

  GET_ALL_COMMENTS: "get-all-comments",
  GET_ONE_COMMENT: "get-one-comment",

  SHOW_CREATE_POST_POPUP: "show-create-post-popup",
  SHOW_ONE_POST_POPUP: "show-comments-popup",
};

export const postInitialState = {
  content: "",

  commentInput: "",

  allPosts: null,
  oneUserPosts: null,

  onePost: null,

  allComments: null,
  oneComment: null,

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

    // * Comment input
    case POST_TYPES.COMMENT_INPUT: {
      return {
        ...postState,
        commentInput: payload,
      };
    }

    // * Get posts
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
    // * Get all comments
    case POST_TYPES.GET_ALL_COMMENTS: {
      return {
        ...postState,
        allComments: payload,
      };
    }
    // * Get one comment
    case POST_TYPES.GET_ONE_COMMENT: {
      return {
        ...postState,
        oneComment: payload,
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
