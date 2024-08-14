import { SuggestedFriends, SwitchPostsEvents } from "../components";
import { OnePostPopup } from "../components/popup-windows";
import { usePostContext } from "../contexts/postContext/PostContext";

function Feed() {
  const { commentsPopup } = usePostContext();

  const feedView = true;

  return (
    <>
      {commentsPopup && (
        <div className=" w-full h-[100vh] flex justify-center items-center fixed z-30 opacity-100 blur-0 translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] ">
          <OnePostPopup />
        </div>
      )}
      <section
        className={`w-[90vw] mx-auto 
        ${commentsPopup && " blur opacity-90"}
        `}
      >
        <main className="flex justify-between">
          <div className="w-[60%]">
            <SwitchPostsEvents feedView={feedView} />
          </div>
          <div className="w-[20%] h-[80vh] overflow-y-scroll">
            <SuggestedFriends />
          </div>
        </main>
      </section>
    </>
  );
}

export default Feed;
