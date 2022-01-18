import { useContext, useRef } from 'react'
import { AppContext } from '../../Context/AppContext'
import { postAPI } from '../../Helpers/postAPI'
import { loginUrl, loginAuditText } from '../../Helpers/constants'


const useHooks = () => {
    const {isSignedIn, setIsSignedIn, currentUser, setCurrentUser} = useContext(AppContext)
    const email = useRef()
    const password = useRef()

    const handleLogin = (e) => {
        e.preventDefault()
        // data needed to fulfill API request
        const requestData = {
            email: email.current.value,
            password: password.current.value
        }
        // Call function from useAxiosPost.js - postAPI(url, requestData, headers, auditTrail, method)
        postAPI(loginUrl, requestData, null, loginAuditText, 'POST')
            .then( data => {
                setCurrentUser( data )
            })
            .catch(error => {
                //TODO: add error message handling
            })
    }

    return {
        handleLogin,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
        email,
        password
    }
}

export default useHooks