import Home from '../MainApp/Home'
import Login from '../MainApp/Login'
import Register from "../MainApp/Register"
import AuthRoute from './AuthRoute';
import ReverseAuthRoute from './ReverseAuthRoute'

const Index = ({ Routes, Route, isSignedIn, currentUser }) => {
  return (
    <>
      <Routes>
        <Route exact path = "/" element = { <AuthRoute isSignedIn = { isSignedIn }/> }>
          <Route exact path = "/app/:username" element = { <Home/> }/>
        </Route>
        <Route exact path = "/register" element = { <ReverseAuthRoute isSignedIn = { isSignedIn } currentUser = { currentUser }/> }>
          <Route exact path = "/register" element = { <Register/> }/>
        </Route>
        <Route exact path = "/login" element = { <ReverseAuthRoute isSignedIn = { isSignedIn } currentUser = { currentUser }/> }>
          <Route exact path = "/login" element = { <Login/> }/>
        </Route>
        <Route path = "*" element = { <ReverseAuthRoute isSignedIn = { isSignedIn } currentUser = { currentUser }/> }>
          <Route path = "*" element = { <Login/> }/>
        </Route>
      </Routes>
    </>
  )
}

export default Index