import { Route, Routes, Navigate } from "react-router-dom";
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

import CreateEvent from "./views/CreateEvent";
import SinglePageEvent from "./views/SinglePageEvent";

import CheckoutForm from "./components/stripe/CheckoutForm";
import Return from "./components/stripe/Return";

import { useRegisterContext } from "./contexts/registerContext/RegisterContext";

function App() {
  const { loggedInUser } = useAuthContext();
  const { toCustomizeProfile } = useRegisterContext();

  return (
    <>
      {!loggedInUser ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      ) : toCustomizeProfile ? (
        <Routes>
          <Route
            path="/signup/customize-profile"
            element={<CustomizeProfile />}
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<FeedLayout />}>
            <Route index element={<Feed />} />
            <Route path=":username" element={<UserProfile />} />
            <Route path="createEvent" element={<CreateEvent />} />
            <Route path="event/:eventId" element={<SinglePageEvent />} />
            <Route path="/:eventId/checkout" element={<CheckoutForm />} />
            <Route path="/:eventId/return" element={<Return />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      )}

      <Toaster />
    </>
  );
}

export default App;
