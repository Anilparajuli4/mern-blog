import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/project' element={<Projects/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
      </Routes>
    </Router>
  )
}

export default App