import { useContext, useRef } from 'react'
import { AppContext } from '../../../../../Context/AppContext'
import { postAPI } from '../../../../../Helpers/postAPI'
import { updateUserProjectsUrl } from '../../../../../Helpers/constants'


const useHooks = ( userData ) => {
    const { currentUser } = useContext( AppContext )

    const handleAddUserProjects = ( e, handleclose, getNewProjects, selectedProjects ) => {
        console.log(currentUser.headers)
        e.preventDefault()
        const requestData = {
            user_id: userData.id,
            project_ids: selectedProjects ? JSON.stringify(selectedProjects) : []
        }
        // Call function from useAxiosPost.js - postAPI(url, requestData, headers, auditTrail, method)
        postAPI(updateUserProjectsUrl, requestData, currentUser.headers, null, 'POST')
            .then( data => {
                handleclose()
                getNewProjects()
            })
            .catch(error => {
                //TODO: add error message handling
            })
    }

    return {
        handleAddUserProjects
    }
}

export default useHooks