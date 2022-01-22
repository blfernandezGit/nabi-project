import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import RouteComponent from '../../Routes'
import LoginLoading from '../LoadingScreen/LoginLoading'
import useHooks from './hooks'

const Index = () => {
    const { isSignedIn, currentUser, isLoading } = useHooks()

    return (
        <>
            <Router>
                {isLoading && <LoginLoading/>}
                <RouteComponent 
                    Routes = { Routes } 
                    Route = { Route } 
                    isSignedIn = { isSignedIn }
                    currentUser = { currentUser }
                />
            </Router>
        </>
    )
}

export default Index
