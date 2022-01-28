import { useContext, useRef } from 'react'
import { AppContext } from '../../../../Context/AppContext'
import { postAPI } from '../../../../Helpers/postAPI'
import { projectListUrl, ticketListUrl, userListUrl, createTicketAuditText } from '../../../../Helpers/constants'


const useHooks = ( code, ticket_no ) => {
    const { currentUser } = useContext( AppContext )
    const title = useRef()
    const description = useRef()
    const status = useRef()
    const resolution = useRef()
    const uploadedImage = useRef()
    const deleteImage = useRef()
    let image = null

    const handleEditTicket = ( e, handleclose, getUpdatedTicket, selectedAssignee ) => {
        e.preventDefault()
        const requestData = new FormData()
        requestData.append('title', title.current.value)
        requestData.append('description', description.current.value)
        requestData.append('status', status.current.value)
        requestData.append('assignee_id', selectedAssignee?.id)
        requestData.append('resolution', resolution.current.value)
        if(uploadedImage.current.files[0])
        {
            image = uploadedImage.current.files[0]
            requestData.append('image', image)
        }
        deleteImage?.current?.value && requestData.append('delete_image', deleteImage.current.value)
        // Call function from useAxiosPost.js - postAPI(url, requestData, headers, auditTrail, method)
        postAPI(`${projectListUrl}/${code}/${ticketListUrl}/${ticket_no}`, requestData, currentUser.headers, createTicketAuditText, 'PATCH')
            .then( data => {
                handleclose()
                getUpdatedTicket()
            })
            .catch(error => {
                //TODO: add error message handling
            })
    }

    return {
        handleEditTicket,
        title,
        description,
        status,
        resolution,
        uploadedImage,
        deleteImage
    }
}

export default useHooks