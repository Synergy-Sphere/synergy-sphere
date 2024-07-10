import { useEffect, useState } from "react";
import OneSuggestedFriend from "./OneSuggestedFriend";

const SuggestedFriends = () => {
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  useEffect(() => {
    async function getAllUsers() {
      const response = await fetch(
        "http://localhost:5555/user/suggestedFriends",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setSuggestedFriends(data);
      } else {
        const { error } = response.json();
        console.log(error.message);
      }
    }
    getAllUsers();
  }, []);

  return (
    <div>
      {suggestedFriends?.map((x) => (
        <OneSuggestedFriend
          key={x._id}
          fullName={x.fullName}
          interests={x.interests}
          profilePic={x.profilePic}
          username={x.username}
        />
      ))}
    </div>
  );
};

export default SuggestedFriends;
