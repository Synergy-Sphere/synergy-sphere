import { useUserContext } from "../contexts/userContext/UserContext";

import { UploadWidget, SetInterests, SetLocation } from "../components";
import { useAuthContext } from "../contexts/authContext/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useRegisterContext } from "../contexts/registerContext/RegisterContext";

function CustomizeProfile() {
  const {
    userDispatch,
    userProfilePic,
    userInterests,
    userLocation,

    SET_USER_LOCATION,
    SET_USER_PROFILE_PIC,
    SET_USER_INTERESTS,
  } = useUserContext();

  const { registerDispatch, REGISTER_TYPES } = useRegisterContext();
  const { updateUser, loggedInUser } = useAuthContext();

  const { _id: id } = loggedInUser;

  const nav = useNavigate();

  return (
    <div
      className="w-[80%] mx-auto my-8 flex flex-col items-center gap-12
    justify-center
    md:flex-row md:items-start
    "
    >
      <div className="flex flex-col gap-3">
        <img src={userProfilePic} alt="avatar" className="w-40" />
        <UploadWidget
          uwConfig={{
            cloudName: "dkxqxmpjo",
            uploadPreset: "synergy-sphere",
            multiple: false,
            maxImageFileSize: 20000000,
            folder: "avatars",
          }}
          userProfilePic={userProfilePic}
          userDispatch={userDispatch}
          types={SET_USER_PROFILE_PIC}
          updateUser={updateUser}
        />
      </div>

      <div
        className="flex flex-col justify-between w-full
      md:items-start gap-4 
      "
      >
        <div className="w-full">
          <SetInterests
            dispatch={userDispatch}
            types={SET_USER_INTERESTS}
            userReducerInterests={userInterests}
            idParams={id}
          />
        </div>

        <div className="w-full">
          <SetLocation
            dispatch={userDispatch}
            userLocation={userLocation}
            types={SET_USER_LOCATION}
            updateUser={updateUser}
            idParams={id}
          />
        </div>
        <button
          className="btn m-4"
          onClick={() => {
            registerDispatch({
              type: REGISTER_TYPES.TO_CUSTOMIZE_PROFILE,
              payload: false,
            });
            nav("/");
          }}
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}

export default CustomizeProfile;
