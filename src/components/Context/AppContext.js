import { createContext, useState } from 'react'
import useSessionStorage from '../Helpers/useSessionStorage'
import useLocalStorage from '../Helpers/useLocalStorage'
export const AppContext = createContext();

const AppContextProvider = ( props ) => {
    const [ isSignedIn, setIsSignedIn ] = useSessionStorage( 'isSignedIn', '' )
    const [ currentUser, setCurrentUser ] = useLocalStorage( 'currentUser', '' )
    const [ isLoading, setIsLoading ] = useState( false )
    const state = { isSignedIn, currentUser, isLoading }
    const setState = { setIsSignedIn, setCurrentUser, setIsLoading }

    return (
        <AppContext.Provider value={{ ...state, ...setState }}>
            { props.children }
        </AppContext.Provider>
    )
}

export default AppContextProvider;