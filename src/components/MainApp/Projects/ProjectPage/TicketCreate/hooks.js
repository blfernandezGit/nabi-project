import { useContext, useRef } from 'react'
import { AppContext } from '../../../../Context/AppContext'
import { postAPI } from '../../../../Helpers/postAPI'
import { projectListUrl, ticketListUrl, createTicketAuditText } from '../../../../Helpers/constants'


const useHooks = ( code  ) => {
    const { currentUser } = useContext( AppContext )
    const title = useRef()
    const description = useRef()
    const status = useRef()

    const handleCreateTicket = ( e, handleclose, getNewTickets, selectedAssignee ) => {
        e.preventDefault()
        const requestData = {
            title: title.current.value,
            description: description.current.value,
            status: status.current.value,
            assignee_id: selectedAssignee?.id,
        }
        // Call function from useAxiosPost.js - postAPI(url, requestData, headers, auditTrail, method)
        postAPI(`${projectListUrl}/${code}/${ticketListUrl}`, requestData, currentUser.headers, createTicketAuditText, 'POST')
            .then( data => {
                handleclose()
                getNewTickets()
            })
            .catch(error => {
                //TODO: add error message handling
            })
    }

    return {
        handleCreateTicket,
        title,
        description,
        status
    }
}

export default useHooks