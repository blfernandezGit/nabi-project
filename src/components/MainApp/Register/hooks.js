import { useContext, useRef } from 'react'
import { AppContext } from '../../Context/AppContext'
import { postAPI } from '../../Helpers/postAPI'
import { registerUrl, registerAuditText } from '../../Helpers/constants'
import Cookies from 'js-cookie'


const useHooks = () => {
    const {isSignedIn, setIsSignedIn, currentUser, setCurrentUser, setIsLoading} = useContext(AppContext)
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordConfirmation = useRef()

    const handleSignUp = (e) => {
        e.preventDefault()
        // data needed to fulfill API request
        const requestData = {
            first_name: firstName.current.value,
            last_name: lastName.current.value,
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
            password_confirmation: passwordConfirmation.current.value,
        }
        setIsLoading( true )
        // Call function from useAxiosPost.js - postAPI(url, requestData, headers, auditTrail, method)
        postAPI(registerUrl, requestData, null, registerAuditText, 'POST')
            .then( data => {
                setIsLoading( false )
                Cookies.set('user', true, { expires: 1 })
                setCurrentUser( data )
                setIsSignedIn( true )
            })
            .catch(error => {
                setIsLoading( false )
                //TODO: add error message handling
            })
    }

    return {
        handleSignUp,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
        firstName,
        lastName,
        username,
        email,
        password,
        passwordConfirmation
    }
}

export default useHooks