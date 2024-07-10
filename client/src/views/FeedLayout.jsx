import { Outlet } from "react-router-dom"
import { Navbar } from "../components"


function FeedLayout() {
  return <>
  <header>
    <Navbar />
  </header>

  <main>
    <Outlet />
  </main>
  </>
}

export default FeedLayout