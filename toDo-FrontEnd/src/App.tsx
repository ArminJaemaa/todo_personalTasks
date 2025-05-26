import './App.css'
import Menu from './components/Menu'
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ProfilePage from './pages/ProfilePage'
import PrivateRoute from './components/PrivateRoute'
import TaskList from './components/TaskList'

function App() {

  return (
    <>
      <Menu/>
      <Routes>
        <Route path='/'  element={<MainPage/>}/>
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />

        <Route element={<PrivateRoute/>}>
          <Route path='/dashboard' element={<TaskList/>} />
          <Route path='/profile-page' element={<ProfilePage/>} />
        </Route>


        <Route path='/*' element={ <div>Page Not Found</div>} />
      </Routes>

    </>
  )
}

export default App
