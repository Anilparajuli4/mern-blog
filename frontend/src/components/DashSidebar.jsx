import { Sidebar } from "flowbite-react"
import { useEffect, useState } from "react"
import { HiArrowSmRight, HiDocumentText, HiUser } from "react-icons/hi"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"



function DashSidebar() {
    const {currentuser} = useSelector(state => state.user)
    const location = useLocation()
    const [tab, setTab] = useState('')
  
    useEffect(()=>{
     const urlParams = new URLSearchParams(location.search)
     const tabfromUrl = urlParams.get('tab')
     if(tabfromUrl){
      setTab(tabfromUrl)
     }
     
    },[location.search])
  return ( 
 <Sidebar className="w-full md:w-56">
<Sidebar.Items>
    <Sidebar.ItemGroup className="flex flex-col gap-y-1">
        <Link to='/dashboard?tab=profile'>
        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentuser?.user?.isAdmin ? 'admin':'user'} labelColor='dark' as='div'>
            Profile
        </Sidebar.Item>
        </Link>
        {currentuser?.user?.isAdmin && (
         <Link to='/dashboard?tab=post' >
         <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as='div'>Posts</Sidebar.Item>
     </Link>
        )}
        
        
        <Sidebar.Item  icon={HiArrowSmRight}>
            Sign Out
        </Sidebar.Item>
    </Sidebar.ItemGroup>
</Sidebar.Items>
</Sidebar> 
  )
}

export default DashSidebar

