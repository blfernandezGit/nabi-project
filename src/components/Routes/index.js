import Login from '../MainApp/Login';
import Register from '../MainApp/Register';
import AuthRoute from './AuthRoute';
import ReverseAuthRoute from './ReverseAuthRoute';
import AdminAuthRoute from './AdminAuthRoute';
import AdminProjects from '../MainApp/Admin/Projects';
import AdminUsers from '../MainApp/Admin/Users';
import AdminProjectUsers from '../MainApp/Admin/Projects/Users';
import AdminUserProjects from '../MainApp/Admin/Users/Projects';
import Projects from '../MainApp/Projects';
import Project from '../MainApp/Projects/ProjectPage';
import Ticket from '../MainApp/Projects/ProjectPage/TicketPage';
import Sidebar from '../MainApp/Layout/Sidebar';

const Index = ({Routes, Route, isSignedIn, currentUser}) => {
  return (
    <>
      <Routes>
        <Route exact path = "/" element = { <AuthRoute isSignedIn = { isSignedIn }/> }>
          <Route exact path = "app/:username/projects" element = { <Sidebar><Projects/></Sidebar>}/>
          <Route exact path = "app/:username/projects/:code" element = { <Sidebar><Project/></Sidebar> }/>
          <Route exact path = "app/:username/projects/:code/:ticket_no" element = { <Sidebar><Ticket/></Sidebar> }/>
          <Route exact path = "app/:username/admin" element = { <AdminAuthRoute currentUser = { currentUser }/> }>
            <Route exact path = "" element = { <Sidebar><AdminUsers/></Sidebar> }/>
            <Route exact path = "users" element = { <Sidebar><AdminUsers/></Sidebar> }/>
            <Route exact path = "users/:user_username" element = { <Sidebar><AdminUserProjects/></Sidebar> }/>
            <Route exact path = "projects" element = { <Sidebar><AdminProjects/></Sidebar> }/>
            <Route exact path = "projects/:project_code" element = { <Sidebar><AdminProjectUsers/></Sidebar>}/>
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
  );
};

export default Index;
