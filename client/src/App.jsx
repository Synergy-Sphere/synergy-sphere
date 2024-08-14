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
import CheckoutForm from "./components/stripe/CheckoutForm";
import Return from "./components/stripe/Return";

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

            <Route
              path="/:id/feed/:username/createEvent"
              element={<CreateEvent />}
            />

            <Route
              path="/:id/feed/event/:eventId"
              element={<SinglePageEvent />}
            />
            <Route
              path="/:id/feed/:username/event/:eventId"
              element={<SinglePageEvent />}
            />

          </Route>
        )}
        <Route path="/:eventId/checkout" element={<CheckoutForm />}/>
        <Route path="/:eventId/return" element={<Return />}/>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
