import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Login, Signup, CustomizeProfile } from "./views";

import { useAuthContext } from "./contexts/authContext/AuthContext";
function App() {
  const { loggedInUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {loggedInUser && (
          <Route path="/:id/customize-profile" element={<CustomizeProfile />} />
        )}
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
