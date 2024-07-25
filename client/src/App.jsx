import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import {
  Login,
  Signup,
  CustomizeProfile,
  Feed,
  FeedLayout,
  UserProfile,
} from "./views";

import { useAuthContext } from "./contexts/authContext/AuthContext";
import { useState } from "react";
import CreateEvent from "./views/CreateEvent";
import SinglePageEvent from "./views/SinglePageEvent";


function App() {
  const [canNavToFeed, setCanNavToFeed] = useState(false);
  const { loggedInUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/" element={<Login setCanNavToFeed={setCanNavToFeed} />} />
        <Route path="/signup" element={<Signup />} />
        {loggedInUser && (
          <Route
            path="/:id/customize-profile"
            element={<CustomizeProfile setCanNavToFeed={setCanNavToFeed} />}
          />
        )}
        {loggedInUser && (
          <Route path="/:id/feed" element={<FeedLayout />}>
            <Route index element={<Feed />} />
            <Route path=":username" element={<UserProfile />} />

            <Route path="createEvent" element={<CreateEvent />} />
            <Route path="event/:eventId" element={<SinglePageEvent />} />

            <Route />
          </Route>
        )}
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
