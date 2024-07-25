import { createContext, useContext, useReducer } from "react";

import { POST_TYPES, postInitialState, postReducer } from "./postReducer";

const PostContext = createContext();

export function usePostContext() {
  return useContext(PostContext);
}

function PostContextProvider({ children }) {
  const [postState, postDispatch] = useReducer(postReducer, postInitialState);

  // console.log("post state --> ", postState);
  // console.log("PostContext onePost -->", postState.onePost);
  // console.log("PostContext oneComment -->",postState.oneComment);
  // console.log("PostContext all Comments -->",postState.allComments);

  

  return (
    <PostContext.Provider value={{ ...postState, ...POST_TYPES, postDispatch }}>
      {children}
    </PostContext.Provider>
  );
}

export default PostContextProvider;
