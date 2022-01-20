import { Navigate, Outlet } from 'react-router-dom'


const ReverseAuthRoute = ({ currentUser, isSignedIn }) => {
    const userDetails = currentUser?.details
    return !isSignedIn ? <Outlet/> : <Navigate replace to={`/app/${userDetails?.username}`} />
}

export default ReverseAuthRoute;