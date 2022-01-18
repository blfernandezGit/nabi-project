import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import RouteComponent from '../../Routes'
import useHooks from './hooks'

const Index = () => {
    const { isSignedIn, currentUser } = useHooks()

    return (
        <>
            <Router>
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
