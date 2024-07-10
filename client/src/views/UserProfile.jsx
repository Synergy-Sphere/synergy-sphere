import { useParams } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext/AuthContext";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";

function UserProfile() {
  const [userInfo, setUserInfo] = useState(null);

  const { id, username } = useParams();

  const { loggedInUser } = useAuthContext();

  const isOwner = loggedInUser.username === username;

  console.log(isOwner);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await fetch(`http://localhost:5555/user/${username}`);

        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error.message);
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getUserInfo();
  }, []);

  console.log("visited user info -->", userInfo);
  return (
    <>
      <section className="w-[90vw] mx-auto">
        <header>
          <div>
            <img src="" alt="cover-pc" />
          </div>
        </header>

        <main>
          <h3 className=" text-3xl font-bold">{userInfo?.fullName}</h3>
        </main>
      </section>
    </>
  );
}

export default UserProfile;
