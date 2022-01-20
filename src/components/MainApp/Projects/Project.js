import { useEffect } from 'react'
import { ProjectContainer } from './customComponents' 
import MaterialTypography from '@mui/material/Typography'


// TODO: deal with useQuery errors - limit fetching
const Project = ({ project, projectListUrl, useQuery, apiClient, currentUser, setIsLoading, ticketListUrl, userListUrl }) => {
    const projectDetails = project?.attributes
    let projectOpenTicketCount
    let latestTicket
    let latestTicketAuthor

    const { isLoading: isLoadingTicket, data: ticketData } = useQuery( `${ projectDetails.code }_ticketsData`, apiClient(`${projectListUrl}/${projectDetails.code}/${ticketListUrl}`, currentUser.headers, null, 'GET' ))
    const { data: usersData } = useQuery( 'userList', apiClient( userListUrl, currentUser.headers, null, 'GET' ))
    
    const projectTicketCount = !isLoadingTicket ? ( ticketData ? ticketData?.length : 0 ) : <span style = {{ color: 'gray' }}>Loading tickets...</span>

    if( projectTicketCount > 0 ) {
        projectOpenTicketCount = ticketData?.filter(ticket => ticket?.attributes?.status === 'Open').length
        latestTicket = ticketData[ticketData?.length-1]?.attributes?.title
        latestTicketAuthor = usersData?.filter(user => user?.id === ticketData[ticketData?.length-1]?.attributes?.author_id)[0].attributes?.username
    }

    return (
        <>
        <ProjectContainer maxWidth="sm" sx={{my: 1, borderRadius: 3, p: 2}} >
            <MaterialTypography
                variant="h6">
                {projectDetails?.name}
            </MaterialTypography>
            <MaterialTypography
                variant="h7">
                {projectDetails?.description}
            </MaterialTypography>
            <MaterialTypography
                variant="body2">
                No. of Tickets: { projectTicketCount }
            </MaterialTypography>
            {projectTicketCount > 0 &&
                <>
                    <MaterialTypography
                        variant="body2">
                        No. of Open Tickets: { projectOpenTicketCount }
                    </MaterialTypography>
                    <MaterialTypography
                        variant="body2">
                        Latest Ticket: { latestTicket } posted by { latestTicketAuthor }
                    </MaterialTypography>
                </>
            }
        </ProjectContainer>
        </>
    )
}

export default Project
