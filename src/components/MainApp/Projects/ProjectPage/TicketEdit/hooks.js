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

    const handleEditTicket = ( e, handleclose, getUpdatedTicket, selectedAssignee ) => {
        e.preventDefault()
        const requestData = {
            title: title.current.value,
            description: description.current.value,
            status: status.current.value,
            assignee_id: selectedAssignee?.id,
            resolution: resolution.current.value
        }
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
        resolution
    }
}

export default useHooks