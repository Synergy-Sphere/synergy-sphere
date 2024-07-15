import React from "react";
import { profileAvatar } from "../../assets";
import { usePostContext } from "../../contexts/postContext/PostContext";

import { useCreatePost } from "../../hooks";

function CreatePostPopup() {
  const { content, TEXT_AREA, postDispatch } = usePostContext();

  const { posting } = useCreatePost();

  async function handlePost(e) {
    e.preventDefault();

    await posting(content);
  }
  return (
    <div className="w-full h-[100vh] flex justify-center items-center fixed z-30 opacity-100 blur-0">
      <div className=" w-[40%] h-[50%] p-8 bg-yellow-200 border border-black flex flex-col">
        <div className="relative border-b border-gray-400 ">
          <h4 className=" text-center text-2xl font-bold  mb-4">Create post</h4>

          <button className="btn rounded-full absolute right-0 top-[-.7rem] bg-red-300 text-3xl">
            &times;
          </button>
        </div>

        <div className=" flex justify-start items-center m-4 gap-4">
          <img src={profileAvatar} alt="" className=" w-12 h-12 rounded-full" />
          <span>auth user</span>
        </div>

        <form
          onSubmit={handlePost}
          className=" w-full h-full flex flex-col justify-between gap-4 "
        >
          <textarea
            className=" resize-none h-full rounded-md p-4 text-lg"
            value={content}
            onChange={({ target }) =>
              postDispatch({ type: TEXT_AREA, payload: target.value })
            }
          />

          <button
            type="submit"
            className="btn bg-green-200"
            disabled={content.length === 0}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePostPopup;
