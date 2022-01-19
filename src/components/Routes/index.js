import { Navigate } from 'react-router-dom'
import Home from '../MainApp/Home'
import Login from '../MainApp/Login'
import Register from "../MainApp/Register";

const Index = ({ Routes, Route, isSignedIn, currentUser }) => {
  return (
    <>
      <Routes>
        <Route exact path="/app/:username"
          element={
            isSignedIn ? <Home/> : <Navigate replace to='/login'/> 
          }
        />
        <Route exact path="/login"
          element={
            isSignedIn ? <Navigate replace to={`/app/${currentUser[0].username}`}/> : <Login />
          }
        />
        <Route exact path="/register"
          element={
            isSignedIn ? <Navigate replace to={`/app/${currentUser[0].username}`}/> : <Register />
          }
        />
        <Route exact path="/"
          element={
            isSignedIn ? <Navigate replace to={`/app/${currentUser[0].username}`}/> : <Login />
          } 
        />
      </Routes>
    </>
  )
}

export default Index