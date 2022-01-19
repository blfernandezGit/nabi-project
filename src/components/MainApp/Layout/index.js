import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import RouteComponent from '../../Routes'
import LoadingScreen from '../LoadingScreen'
import useHooks from './hooks'

const Index = () => {
    const { isSignedIn, currentUser, isLoading } = useHooks()

    return (
        <>
            <Router>
                {isLoading && <LoadingScreen/>}
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
