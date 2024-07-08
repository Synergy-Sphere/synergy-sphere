import { useUserContext } from "../contexts/userContext/UserContext";

import { UploadWidget, LogoutButton, SetInterests } from "../components";


function CustomizeProfile() {
  const { userState, userDispatch, USER_TYPES } = useUserContext();

  return (
    <div className="w-[80%] mx-auto my-20 flex flex-col items-center gap-12">
      <div className="flex flex-col gap-3">
        <img src={userState.userProfilePic} alt="avatar" className="w-48" />
        <UploadWidget
          uwConfig={{
            cloudName: "dkxqxmpjo",
            uploadPreset: "synergy-sphere",
            multiple: false,
            maxImageFileSize: 20000000,
            folder: "avatars",
          }}
          userDispatch={userDispatch}
          types={USER_TYPES}
        />
      </div>
      <SetInterests />
      <LogoutButton />
    </div>
  );
}

export default CustomizeProfile;
