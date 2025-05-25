import './App.css'
import Menu from './Components/Menu'
import { Route, Routes } from 'react-router-dom'
import MainPage from './Pages/MainPage'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import DashBoard from './Pages/DashBoard'
import ProfilePage from './Pages/ProfilePage'
import PrivateRoute from './Components/PrivateRoute'

function App() {

  return (
    <>
      <Menu/>
      <Routes>
        <Route path='/'  element={<MainPage/>}/>
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />

        <Route element={<PrivateRoute/>}>
          <Route path='/dashboard' element={<DashBoard/>} />
          <Route path='/profile-page' element={<ProfilePage/>} />
        </Route>


        <Route path='/*' element={ <div>Page Not Found</div>} />
      </Routes>

    </>
  )
}

export default App
