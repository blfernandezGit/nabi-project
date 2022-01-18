import { useContext, useEffect } from 'react'
import { AppContext } from '../../Context/AppContext'
import Cookies from 'js-cookie'


const useHooks = () => {
    const { isSignedIn, setIsSignedIn, currentUser, setCurrentUser } = useContext( AppContext )

    useEffect(() => {
        readCookie()
        //eslint-disable-next-line
    }, [])

    const readCookie = () => {
        const user = Cookies.get('user')
        if( user ) {
            setIsSignedIn( true )
        } else {
            setIsSignedIn( false )
        }
    } 
    
    return {
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser
    }
}

export default useHooks