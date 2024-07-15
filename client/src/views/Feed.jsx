import {
  SuggestedFriends,
  SwitchPostsEvents,
} from "../components";
function Feed() {
  return (
    <>
      <section className="w-[90vw] mx-auto">
        
        <main className="flex justify-between">
          <div className="w-[60%]">
            <SwitchPostsEvents />
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
