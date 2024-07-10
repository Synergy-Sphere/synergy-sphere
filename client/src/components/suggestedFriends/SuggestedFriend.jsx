import Avatar from '@mui/material/Avatar';

const SuggestedFriend = ({ fullName, interests, profilePic }) => {
  return (
    <div>
      <div className="flex flex-col justify-start items-start p-2 border-y-2 border-gray-400">
        <div className="flex gap-4 items-center">
          <div className=" rounded-full flex justify-center items-center p-2">
            {/* <img src={profilePic} alt="" className="w-12 " /> */}
            <Avatar alt="" src={profilePic}
           sx={{ width: 56, height: 56 }} />
          </div>

          <p className="text-xl">{fullName}</p>
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
