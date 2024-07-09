import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Login, Signup, CustomizeProfile, Feed } from "./views";

import { useAuthContext } from "./contexts/authContext/AuthContext";
import { useState } from "react";
function App() {
  const [canNavToFeed, setCanNavToFeed] = useState(false);
  const { loggedInUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {loggedInUser && (
          <Route path="/:id/customize-profile" element={<CustomizeProfile />} />
        )}
        {loggedInUser && canNavToFeed && (
          <Route path="/:id/feed" element={<Feed />}>
            <Route />
            <Route />
            <Route />
          </Route>
        )}
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
