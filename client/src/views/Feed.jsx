import {
  LogoutButton,
  SuggestedFriends,
  Navbar,
  SwitchPostsEvents,
} from "../components";
function Feed() {
  return (
    <>
      <section className="w-[90vw] mx-auto">
        <header className="flex justify-center items-center m-4">
          <Navbar />
          {/* <LogoutButton /> */}
        </header>
        <main className="flex justify-between">
          <div className="w-[60%]">
            <SwitchPostsEvents />
          </div>
          <div className="w-[20%]">
            <SuggestedFriends />
          </div>
          
        </main>
      </section>
    </>
  );
}

export default Feed;
