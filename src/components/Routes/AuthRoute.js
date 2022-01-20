import { Navigate, Outlet } from 'react-router-dom'


const AuthRoute = ({ isSignedIn }) => {
    return isSignedIn ? <Outlet/> : <Navigate replace to="/login" />
}

export default AuthRoute;