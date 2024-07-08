import { profileAvatar } from "../../assets";

export const USER_TYPES = {
  SET_USER_PROFILE_PIC: "set-user-profile-pic",

  SET_USER_INTERESTS: "set-user-interests",

  SET_USER_BIO: "set-user-bio",

  SET_USER_LOCATION: "set-user-location",

  SET_USER_POST: "set-user-post",

  SET_USER_EVENT: "set-user-event",

  SET_USER_FRIENDS_LIST: "set-user-friends-list",
};

export const userInitialState = {
  userProfilePic: profileAvatar,
  userInterests: "",
  userBio: "",
  userLocation: "",
  userPost: "",
  userEvent: "",
  userFriendsList: "",
};

export function userReducer(userState, { type, payload }) {
  switch (type) {
    case USER_TYPES.SET_USER_PROFILE_PIC: {
        return {
            ...userState,
            userProfilePic: payload
        }
    }
    default: {
      return userState;
    }
  }
}
