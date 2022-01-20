import Home from '../MainApp/Home'
import Login from '../MainApp/Login'
import Register from "../MainApp/Register"
import AuthRoute from './AuthRoute';
import ReverseAuthRoute from './ReverseAuthRoute'
import AdminAuthRoute from './AdminAuthRoute'
import AdminProjects from '../MainApp/Admin/Projects'
import AdminUsers from '../MainApp/Admin/Users'
import Projects from '../MainApp/Projects'
import Project from '../MainApp/Projects/ProjectPage'

const Index = ({ Routes, Route, isSignedIn, currentUser }) => {
  return (
    <>
      <Routes>
        <Route exact path = "/" element = { <AuthRoute isSignedIn = { isSignedIn }/> }>
          <Route exact path = "app/:username" element = { <Home/> }/>
          <Route exact path = "app/:username/projects" element = { <Projects/> }/>
          <Route exact path = "app/:username/projects/:code" element = { <Project/> }/>
          {/* <Route exact path = "app/:username/projects/:code/:ticket_no" element = { <Ticket/> }/> */}
          <Route exact path = "app/:username/admin" element = { <AdminAuthRoute currentUser = { currentUser }/> }>
            <Route exact path = "" element = { <Home/> }/>
            <Route exact path = "users" element = { <AdminUsers/> }/>
            <Route exact path = "projects" element = { <AdminProjects/> }/>
          </Route>
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