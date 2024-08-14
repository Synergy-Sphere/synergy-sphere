import { useUserContext } from "../contexts/userContext/UserContext";

import {
  UploadWidget,
  LogoutButton,
  SetInterests,
  SetLocation,
} from "../components";
import { useAuthContext } from "../contexts/authContext/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useRegisterContext } from "../contexts/registerContext/RegisterContext";

function CustomizeProfile({ setCanNavToFeed }) {
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
  const { updateUser } = useAuthContext();

  const { id } = useParams();

  const nav = useNavigate();

  return (
    <div className="w-[80%] mx-auto my-20 flex flex-col items-center gap-12">
      <div className="flex flex-col gap-3">
        <img src={userProfilePic} alt="avatar" className="w-48" />
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
      <SetInterests
        dispatch={userDispatch}
        types={SET_USER_INTERESTS}
        userReducerInterests={userInterests}
      />
      <SetLocation
        dispatch={userDispatch}
        userLocation={userLocation}
        types={SET_USER_LOCATION}
        updateUser={updateUser}
        idParams={id}
      />
      <button
        className="btn m-4"
        onClick={() => {
          // setCanNavToFeed(true);
          // nav(`/${id}/feed`);

          registerDispatch({
            type: REGISTER_TYPES.TO_CUSTOMIZE_PROFILE,
            payload: false,
          });
          nav("/");
        }}
      >
        READY
      </button>
      <LogoutButton />
    </div>
  );
}

export default CustomizeProfile;
