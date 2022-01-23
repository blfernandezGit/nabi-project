import { useContext, useRef } from 'react'
import { AppContext } from '../../../../Context/AppContext'
import { postAPI } from '../../../../Helpers/postAPI'
import { userListUrl, deleteUserAuditText } from '../../../../Helpers/constants'

const useHooks = ( username  ) => {
    const { currentUser } = useContext( AppContext )
    const inputUsername = useRef()

    const handleDeleteUser = ( e, handleclose, getNewUsers ) => {
        e.preventDefault()
        // Call function from useAxiosPost.js - postAPI(url, requestData, headers, auditTrail, method)
        console.log( username )
        if ( inputUsername.current.value === username ) {
        postAPI(`${userListUrl}/${username}`, null, currentUser.headers, deleteUserAuditText, 'DELETE')
            .then( data => {
                handleclose()
                getNewUsers()
            })
            .catch(error => {
                //TODO: add error message handling
            })
        }
        else {
            console.log('Wrong Username')
        }
    }

    return {
        handleDeleteUser,
        inputUsername
    }
}

export default useHooks