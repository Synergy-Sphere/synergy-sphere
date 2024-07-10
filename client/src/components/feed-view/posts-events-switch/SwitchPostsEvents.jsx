import { useState } from "react"

import PostsComponent from "./PostsComponent"
import EventsComponent from "./EventsComponent"

function SwitchPostsEvents() {
    const [ showEvents, setShowEvents] = useState(false)
  return (
    <>
    <button
    className="btn m-2"
    onClick={()=> setShowEvents(true)}
    >Events</button>
    <button
    className="btn m-2"
    onClick={()=> setShowEvents(false)}
    >Posts</button>
    {
        showEvents ? <EventsComponent /> : <PostsComponent />
    }
    </>
  )
}

export default SwitchPostsEvents