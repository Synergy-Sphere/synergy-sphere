import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import toast from "react-hot-toast";

import { useAuthContext } from "../contexts/authContext/AuthContext";

import { SuggestedFriends, SwitchPostsEvents } from "../components";

import { grayBg, profileAvatar } from "../assets";
import { CreatePostPopup } from "../components/popup-windows";


function UserProfile() {
const [userInfo, setUserInfo] = useState(null);

const [ showPopup, setShowPopup ] = useState(false)

  const { id, username } = useParams();

  const { loggedInUser } = useAuthContext();

  const isOwner = loggedInUser.username === username;

  const trY = true

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
    <div className=" relative">
      {showPopup && <CreatePostPopup />}
      <section 
      className={`w-[90vw] mx-auto 
        ${showPopup && " blur opacity-25"}
        `}
      >


        <header className=" border-b-2 border-gray-300  pb-20">
          <div className="w-full flex flex-col justify-center">
            <div className="flex justify-center items-center relative">
              <img
                src={grayBg}
                alt="cover-pc"
                className="max-h-[460px] object-cover max-w-[1250px] w-full"
              />

              <img
                src={userInfo?.profilePic || profileAvatar}
                alt="profile pic"
                className=" w-56 h-56 rounded-full border-white-100 border-8 object-fill absolute bottom-[-9.5rem] left-[22rem] z-10"
              />
              <div
                className="absolute bottom-[-5rem] 
              left-[38rem] flex justify-between"
              >
                <h3 className=" text-3xl font-bold ">{userInfo?.fullName}</h3>
              </div>
            </div>

            <div className="flex justify-end items-center w-[65%] mx-auto my-8">
              <div className="flex gap-4">
                <button className="btn w-40 bg-green-300">Friends</button>

                {isOwner ? (
                  <button className="btn w-40 bg-green-300">
                    Edit profile
                  </button>
                ) : (
                  <button className="btn w-40 bg-green-300">Message</button>
                )}
              </div>
            </div>
          </div>
        </header>


        <main className=" flex gap-4 justify-between m-8">
          <div className="w-[35%]">
                <SuggestedFriends />
          </div>
          <div className="w-[45%]">
                <SwitchPostsEvents />
          </div>
        </main>
      </section>
      </div>
    </>
  );
}

export default UserProfile;
