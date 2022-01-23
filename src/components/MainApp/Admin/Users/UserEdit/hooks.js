import { useContext, useRef } from 'react'
import { AppContext } from '../../../../Context/AppContext'
import { postAPI } from '../../../../Helpers/postAPI'
import { userListUrl, updateUserAuditText } from '../../../../Helpers/constants'

const useHooks = ( username  ) => {
    const { currentUser } = useContext( AppContext )
    const first_name = useRef()
    const last_name = useRef()

    const handleEditUser = ( e, handleclose, getNewUsers ) => {
        e.preventDefault()
        const requestData = {
            first_name: first_name.current.value,
            last_name: last_name.current.value
        }
        // Call function from useAxiosPost.js - postAPI(url, requestData, headers, auditTrail, method)
        postAPI(`${userListUrl}/${username}`, requestData, currentUser.headers, updateUserAuditText, 'PATCH')
            .then( data => {
                handleclose()
                getNewUsers()
            })
            .catch(error => {
                //TODO: add error message handling
            })
    }

    return {
        handleEditUser,
        first_name,
        last_name
    }
}

export default useHooks