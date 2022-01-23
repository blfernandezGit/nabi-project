import { useState } from 'react'
import { useQuery } from 'react-query'
import { apiClient } from '../../../../../Helpers/apiClient'
import { projectListUrl, ticketListUrl, commentsListUrl } from '../../../../../Helpers/constants'
import Comment from './Comment'
import CommentEdit from '../CommentEdit'
import { CommentContainer } from '../customComponents'
import MaterialContainer from '@mui/material/Container'
import MaterialModal from '@mui/material/Modal'

const Index = ({ code, ticket_no, currentUser }) => {

    const { isLoading: isLoadingComments, data: ticketCommentsData, refetch: getNewComments } = useQuery( `${ code }_${ticket_no}_comments`, apiClient(`${projectListUrl}/${code}/${ticketListUrl}/${ticket_no}/${commentsListUrl}`, currentUser.headers, null, 'GET' ), {retry: false})

    return (
        <>
        <MaterialContainer maxWidth = 'md'>
           { ticketCommentsData && 
                ticketCommentsData
                .map( comment => {
                    return <Comment
                                key = { comment.id } 
                                comment = { comment }
                                code = { code }
                                ticket_no = { ticket_no }
                                getNewComments = { getNewComments }
                                apiClient = { apiClient }
                                useQuery = { useQuery }
                                currentUser = { currentUser }
                            />
                }) 
            }
        </MaterialContainer>
        </>
    );
};

export default Index;
