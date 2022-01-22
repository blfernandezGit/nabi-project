import { useQuery } from 'react-query'
import { apiClient } from '../../../../../Helpers/apiClient'
import { projectListUrl, ticketListUrl, commentsListUrl } from '../../../../../Helpers/constants'
import Comment from './Comment'
import MaterialContainer from '@mui/material/Container'

const Index = ({ code, ticket_no, currentUser }) => {

    const { isLoading: isLoadingComments, data: ticketCommentsData, refetch: getNewComments } = useQuery( `${ code }_${ticket_no}_comments`, apiClient(`${projectListUrl}/${code}/${ticketListUrl}/${ticket_no}/${commentsListUrl}`, currentUser.headers, null, 'GET' ), {retry: false})

    console.log( ticketCommentsData )
    return (
        <MaterialContainer maxWidth = 'md'>
           { ticketCommentsData && 
                ticketCommentsData
                .map( comment => {
                    return <Comment
                                key = { comment.id } 
                                comment = { comment }
                                apiClient = { apiClient }
                                useQuery = { useQuery }
                                currentUser = { currentUser }
                            />
                }) 
            }
        </MaterialContainer>
    );
};

export default Index;
