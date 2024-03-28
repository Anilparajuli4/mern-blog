import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"



function AdminPrivateRoute() {
  const {currentuser} = useSelector(state => state.user)
  return (
    currentuser?.user?.isAdmin ? <Outlet/> : <Navigate to='/signinn' />
  )
}

export default AdminPrivateRoute