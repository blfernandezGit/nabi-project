import { useContext } from 'react'
import { AppContext } from '../../../../../Context/AppContext'
import { postAPI } from '../../../../../Helpers/postAPI'
import { projectListUrl, ticketListUrl, createTicketAuditText, deleteRelatedTicketUrl } from '../../../../../Helpers/constants'


const useHooks = ( code, ticket_no  ) => {
    const { currentUser } = useContext( AppContext )

    const handleRemoveRelatedTicket = ( e, getNewRelatedTickets, relatedTicket ) => {
        console.log(relatedTicket?.id)
        e.preventDefault()
        const requestData = {
            related_ticket_id: relatedTicket?.id
        }
        // Call function from useAxiosPost.js - postAPI(url, requestData, headers, auditTrail, method)
        postAPI(`${projectListUrl}/${code}/${ticketListUrl}/${ticket_no}/${deleteRelatedTicketUrl}`, requestData, currentUser.headers, createTicketAuditText, 'DELETE')
            .then( data => {
                getNewRelatedTickets()
            })
            .catch(error => {
                //TODO: add error message handling
            })
    }

    return {
        handleRemoveRelatedTicket
    }
}

export default useHooks