import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreatePost from './pages/CreatePost'
import AdminPrivateRoute from './components/AdminPrivateRoute'
import UpdatePost from './pages/UpdatePages'
import PostPage from './pages/PostPage'

function App() {
  return (
    <Router>
        <Header/>
      <Routes>
      
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
       <Route element={<PrivateRoute/>} >
       <Route path='/dashboard' element={<Dashboard/>} />
       </Route>
       <Route element={<AdminPrivateRoute/>}>
       <Route path='/create-post' element={<CreatePost/>} />
       <Route path='/update-post/:postId' element={<UpdatePost/>} />
       </Route>
       
        <Route path='/project' element={<Projects/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/post/:postSlug' element={<PostPage/>} />
      </Routes>
    </Router>
  )
}

export default App