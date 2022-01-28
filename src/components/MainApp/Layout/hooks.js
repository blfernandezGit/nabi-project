import { useContext, useEffect } from 'react'
import { AppContext } from '../../Context/AppContext'
import Cookies from 'js-cookie'


const useHooks = () => {
    const { isSignedIn, setIsSignedIn, isLoading, currentUser } = useContext( AppContext )

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
        isLoading,
        currentUser
    }
}

export default useHooks