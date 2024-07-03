import { useState } from "react";
import { profileAvatar } from "../assets";

import { UploadWidget } from "../components";

function CustomizeProfile() {
  const [profilePic, setProfilePic] = useState();
  return (
    <div className="w-[80%] mx-auto my-20">
      <img src={profilePic || profileAvatar} alt="avatar" className="w-48" />
      <UploadWidget
        uwConfig={{
          cloudName: "dkxqxmpjo",
          uploadPreset: "synergy-sphere",
          multiple: false,
          maxImageFileSize: 2000000,
          folder: "avatars",
        }}
        setProfilePic={setProfilePic}
      />
    </div>
  );
}

export default CustomizeProfile;


// setProfilePic(result.info.secure_url)