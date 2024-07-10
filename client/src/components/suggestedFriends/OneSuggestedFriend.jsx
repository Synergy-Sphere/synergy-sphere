import Avatar from "@mui/material/Avatar";
import { Link, useParams } from "react-router-dom";

const SuggestedFriend = ({ fullName, interests, profilePic, username }) => {
  const { id } = useParams();

  return (
    <div>
      <div className="flex flex-col justify-start items-start p-2 border-y-2 border-gray-400">
        <div className="flex gap-4 items-center">
          <div className=" rounded-full flex justify-center items-center p-2">
            <Link to={`/${id}/feed/${username}`}>
              <Avatar alt="" src={profilePic} sx={{ width: 56, height: 56 }} />
            </Link>
          </div>

          <Link className="text-xl" to={`/${id}/feed/${username}`}>
            <button>{fullName}</button>
          </Link>
        </div>
        <div>
          <p>
            {interests?.map((interest, i) => (
              <span key={i}> {interest}</span>
            ))}
          </p>
        </div>
        <button className="btn">+ Add friend</button>
      </div>
    </div>
  );
};

export default SuggestedFriend;

/* 
(e) => {
              console.log(e.target.text);
              console.log(username);
            }


    nav(`/${id}/feed/${username}`);

*/
