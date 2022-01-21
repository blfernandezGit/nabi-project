import { Link } from "react-router-dom"
import { BorderLinearProgress } from './customComponents' 
import MaterialTypography from '@mui/material/Typography'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import BugReportIcon from '@mui/icons-material/BugReport'
import { dateFormatter } from '../../Helpers/constants'
import Grid from '@mui/material/Grid'


// TODO: deal with useQuery errors - limit fetching
const Project = ({ project, projectListUrl, useQuery, apiClient, currentUser, setIsLoading, ticketListUrl, userListUrl }) => {
    const projectDetails = project?.attributes
    let projectOpenTicketCount
    let latestTicket
    let latestTicketSubmitDate
    let latestTicketAuthor
    let percentTicketsClosed

    const { isLoading: isLoadingTicket, data: ticketData } = useQuery( `${ projectDetails.code }_ticketsData`, apiClient(`${projectListUrl}/${projectDetails.code}/${ticketListUrl}`, currentUser.headers, null, 'GET' ), {retry: false})
    const { data: usersData } = useQuery( 'userList', apiClient( userListUrl, currentUser.headers, null, 'GET' ))
    
    const projectTicketCount = !isLoadingTicket ? ( ticketData ? ticketData?.length : 0 ) : <span style = {{ color: 'gray' }}>...</span>

    if( projectTicketCount > 0 ) {
        projectOpenTicketCount = ticketData?.filter(ticket => ticket?.attributes?.status === 'Open').length
        latestTicket = ticketData[ticketData?.length-1]?.attributes
        latestTicketSubmitDate = dateFormatter.format(Date.parse(latestTicket?.created_at))
        latestTicketAuthor = usersData?.filter(user => user?.id === ticketData[ticketData?.length-1]?.attributes?.author_id)[0].attributes?.username
        percentTicketsClosed = projectTicketCount > 0 ? (projectTicketCount - projectOpenTicketCount) * 100 / projectTicketCount : 0
    }

    return (
        <TableRow>
            <TableCell>
                <Grid container>
                    <Grid item xs={12} sm={12} md={5}>
                        <Link to={`${projectDetails.code}`} style = {{textDecoration: 'none', color: 'black'}}>
                            <MaterialTypography
                                variant="h6">
                                {projectDetails?.name}
                            </MaterialTypography>
                            <MaterialTypography
                                variant="body2"
                                sx={{pb: 4}}
                                >
                                {projectDetails?.description}
                            </MaterialTypography>
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} sx={{textAlign: 'center'}}>
                        <BugReportIcon/>
                        <MaterialTypography
                            variant="body1">
                            { projectOpenTicketCount ? projectOpenTicketCount : 0 } { projectOpenTicketCount === 1 ? <span>bug</span> : <span>bugs</span> } need action
                        </MaterialTypography>
                        <BorderLinearProgress sx={{pb: 0.75, mt: 1}} variant = "determinate" value = { percentTicketsClosed ? percentTicketsClosed : 0 } ></BorderLinearProgress>
                        <MaterialTypography
                            variant="body1">
                            out of { projectTicketCount ? projectTicketCount : 0 } { projectTicketCount === 1 ? <span>bug</span> : <span>total bugs</span> }
                        </MaterialTypography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={5} sx={{textAlign: 'center'}}>
                        {latestTicket && 
                            <Link to={`${projectDetails.code}/${latestTicket?.ticket_no}`} style = {{textDecoration: 'none', color: 'black'}}>
                                <MaterialTypography
                                    variant="body2">
                                    { latestTicketAuthor } on { latestTicketSubmitDate }:
                                </MaterialTypography>
                                <MaterialTypography
                                    variant="subtitle1">
                                    <q>{ latestTicket?.title }</q>
                                </MaterialTypography>
                            </Link>
                        }
                    </Grid>
                </Grid>
            </TableCell>
        </TableRow>
    )
}

export default Project

