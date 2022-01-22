import { useContext, useRef } from 'react'
import { AppContext } from '../../../../../Context/AppContext'
import { postAPI } from '../../../../../Helpers/postAPI'
import { projectListUrl, ticketListUrl, commentsListUrl, createCommentAuditText } from '../../../../../Helpers/constants'
import { useQuery } from 'react-query'
import { apiClient } from '../../../../../Helpers/apiClient'


const useHooks = ( code, ticket_no, commentId  ) => {
    const { currentUser } = useContext( AppContext )
    const comment_text = useRef()
    // const {isLoading: isLoadingUsers, data: usersData, refetch: getUsersData } = useQuery('userList', apiClient(`${userListUrl}`, currentUser.headers, null, 'GET'), {retry: false, enabled:false})

    const handleEditComment = ( e, handleclose, getNewComments ) => {
        e.preventDefault()
        const requestData = {
            comment_text: comment_text.current.value
        }
        // Call function from useAxiosPost.js - postAPI(url, requestData, headers, auditTrail, method)
        postAPI(`${projectListUrl}/${code}/${ticketListUrl}/${ticket_no}/${commentsListUrl}/${commentId}`, requestData, currentUser.headers, createCommentAuditText, 'PATCH')
            .then( data => {
                handleclose()
                getNewComments()
            })
            .catch(error => {
                //TODO: add error message handling
            })
    }

    return {
        handleEditComment,
        comment_text
    }
}

export default useHooks