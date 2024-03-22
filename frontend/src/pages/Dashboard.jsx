import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import DashSidebar from "../components/DashSidebar"
import DashProfile from "../components/DashProfile"


function Dashboard() {
  const location = useLocation()
  const [tab, setTab] = useState('')

  useEffect(()=>{
   const urlParams = new URLSearchParams(location.search)
   const tabfromUrl = urlParams.get('tab')
   if(tabfromUrl){
    setTab(tabfromUrl)
   }
   console.log(tabfromUrl);
  },[location.search])
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-56">
        <DashSidebar/>
      </div>
      {tab === 'profile' && <DashProfile/>}
    </div>
  )
}

export default Dashboard