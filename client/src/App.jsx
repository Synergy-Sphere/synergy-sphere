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
            <Route path="/:id/feed/:username" element={<UserProfile />} />
            <Route />
          </Route>
        )}
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
