import { useEffect, useState } from "react"
import SuggestedFriend from "./SuggestedFriend";

const SuggestedFriends = () => {
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  useEffect(() => {
    async function getAllUsers() {
        const res = await fetch("http://localhost:5555/user/suggestedFriends", {
          credentials: "include"
        });
        if(res.ok) {
            const data = res.json();
            setSuggestedFriends(data);
        } else {
            const {error} = res.json();
            console.log(error.message);
        }
    }
    getAllUsers();
  }, [])
  
  return (
    <div>{suggestedFriends.map(suggestedFriend => (
        <SuggestedFriend key={suggestedFriend.id} fullName={suggestedFriend.fullName} interests={suggestedFriend.interests} profilePic={suggestedFriend.profilePic}/> 
    ))}</div>
  )
}

export default SuggestedFriends