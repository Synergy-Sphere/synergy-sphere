import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Login, Signup, CustomizeProfile } from "./views";

import { useRegisterContext } from "./contexts/registerContext/RegisterContext";
function App() {

  const { loggedInUser } = useRegisterContext()
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {loggedInUser && <Route path="/:id/customize-profile" element={<CustomizeProfile />} />}
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
