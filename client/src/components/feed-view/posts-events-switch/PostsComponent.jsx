import { useParams } from "react-router-dom"
import { useAuthContext } from "../../../contexts/authContext/AuthContext";


function PostsComponent() {

  const { username } = useParams()

  const { loggedInUser} = useAuthContext()

  console.log("Post comp --> ", loggedInUser);

  console.log(username);
   return (
    <>
    <h3 className=" text-2xl text-center uppercase ">Posts</h3>

    
    
    </>
  )
}

export default PostsComponent