import { Avatar, Button, Dropdown, Navbar,  TextInput } from "flowbite-react"
import { Link, useLocation } from "react-router-dom"
import { IoIosSearch } from "react-icons/io";
import {FaMoon} from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { toogleTheme } from "../redux/theme/themeSlice";
import { IoSunnyOutline } from "react-icons/io5";


function Header() {
  const path = useLocation().pathname
  const {currentuser} = useSelector(state => state.user)
  
  const dispatch = useDispatch()
  const {theme} = useSelector((state)=>state.theme)
  return (
    <Navbar className="border-b-2">
        <Link to='/' className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Anil</span>
            Blog
        </Link>
        <form>
          <TextInput type="text" placeholder="search..." rightIcon={IoIosSearch} className="hidden lg:inline" pill/>
          <Button className="w-12 h-10 lg:hidden">
            <IoIosSearch/>
          </Button>
        </form>
        <div className="flex gap-2 md:order-2">
          <Button className="w-12 h-10 sm:inline " color="gray" pill onClick={()=>dispatch(toogleTheme())}>
           {theme==='light' ?<FaMoon size={20}/> : <IoSunnyOutline size={20}/> }
          </Button>
          {currentuser ? <Dropdown arrowIcon={false} inline label={<Avatar alt="user" img={currentuser.profilePicture} rounded/>}>
            <Dropdown.Header>
              <span className="block text-sm ">@{currentuser.user.username}</span>
              <span className="block text-sm font-medium truncate">{currentuser.user.email}</span>
            </Dropdown.Header>
            <Link to='/dashboard?tab=profile'><Dropdown.Item>dashboard</Dropdown.Item></Link>
            <Dropdown.Divider/>
              <Dropdown.Item>Sign out</Dropdown.Item>
            
          </Dropdown>:  <Link to='signin' >
        
            <Button gradientDuoTone='purpleToBlue' color="gray" pill outline>
              Sign in
            </Button>
          </Link>}
         
       <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
            <Navbar.Link active={path === '/'} as={'div'}>
              <Link to='/'>
                Home
              </Link>
            </Navbar.Link>
            <Navbar.Link  active={path === '/about'} as={'div'}>
              <Link to='/about'>
                About
              </Link>
            </Navbar.Link>
            <Navbar.Link  active={path === '/projects'}as={'div'}>
              <Link to='/projects'>
                Projects
              </Link>
            </Navbar.Link>
          </Navbar.Collapse>
    </Navbar>
  )
}

export default Header