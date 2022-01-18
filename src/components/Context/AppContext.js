import { createContext } from 'react'
import useSessionStorage from '../Helpers/useSessionStorage'
import useLocalStorage from '../Helpers/useLocalStorage'
export const AppContext = createContext();

const AppContextProvider = ( props ) => {
    const [ isSignedIn, setIsSignedIn ] = useSessionStorage( 'isSignedIn', '' );
    const [ currentUser, setCurrentUser ] = useLocalStorage( 'currentUser', '' )
    const state = { isSignedIn, currentUser }
    const setState = { setIsSignedIn, setCurrentUser }

    return (
        <AppContext.Provider value={{ ...state, ...setState }}>
            { props.children }
        </AppContext.Provider>
    )
}

export default AppContextProvider;