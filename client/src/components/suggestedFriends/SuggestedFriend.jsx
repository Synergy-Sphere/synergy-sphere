const SuggestedFriend = ({fullName,interests,profilePic }) => {
  return (
    <div>
      <div className="flex">
        <div>{profilePic}</div>
        <div>
          <p>{fullName}</p>
          <p>{interests?.map(interest => (
            interest
          ))}</p>        
        </div>
      </div>
      <button>+ Add friend</button>
    </div>
  )
}

export default SuggestedFriend