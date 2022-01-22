import { useContext, useRef } from 'react'
import { AppContext } from '../../../../Context/AppContext'
import { postAPI } from '../../../../Helpers/postAPI'
import { projectListUrl, ticketListUrl, userListUrl, createTicketAuditText } from '../../../../Helpers/constants'
import { useQuery } from 'react-query'
import { apiClient } from '../../../../Helpers/apiClient'


const useHooks = ( code  ) => {
    const { currentUser } = useContext( AppContext )
    const title = useRef()
    const description = useRef()
    const status = useRef()
    const assignee = useRef()

    // const {isLoading: isLoadingUsers, data: usersData, refetch: getUsersData } = useQuery('userList', apiClient(`${userListUrl}`, currentUser.headers, null, 'GET'), {retry: false, enabled:false})

    const handleCreateTicket = ( e, handleclose, getNewTickets ) => {
        e.preventDefault()
        const requestData = {
            title: title.current.value,
            description: description.current.value,
            status: status.current.value,
            assignee: description.current.value
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
        status,
        assignee
    }
}

export default useHooks