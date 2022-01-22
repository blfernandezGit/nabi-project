import { Link } from "react-router-dom"
import { dateFormatter } from '../../../Helpers/constants'
import MaterialBugReportIcon from '@mui/icons-material/BugReport'
import MaterialGrid from '@mui/material/Grid'

const Ticket = ({ ticket, useEffect, apiClient, useQuery, userListUrl, currentUser, HideTableCell, MaterialTableCell, MaterialTableRow, MaterialTypography }) => {
    const ticketDetails = ticket?.attributes

    useEffect(() => { 
        ticketDetails?.assignee_id && getUsersData()
        // eslint-disable-next-line
    }, [ticketDetails?.assignee_id])

    const {isLoading: isLoadingUsers, data: usersData, refetch: getUsersData } = useQuery('userList', apiClient(`${userListUrl}`, currentUser.headers, null, 'GET'), {retry: false, enabled:false})
    const assignee = usersData && ticketDetails?.assignee_id && usersData.filter(assignee => assignee?.id === ticketDetails?.assignee_id )[0]?.attributes

    return (
        <MaterialTableRow>
            <HideTableCell>
                <MaterialTypography>
                    { ticketDetails?.ticket_no }
                </MaterialTypography>
            </HideTableCell>
            <MaterialTableCell>
                <MaterialTypography>
                    { ticketDetails?.title }
                </MaterialTypography>
            </MaterialTableCell>
            <MaterialTableCell>
                <MaterialTypography>
                    { ticketDetails?.status }
                </MaterialTypography>
            </MaterialTableCell>
            <HideTableCell>
                <MaterialTypography>
                    { assignee?.last_name }, { assignee?.first_name }
                </MaterialTypography>
            </HideTableCell>
        </MaterialTableRow>
    );
};

export default Ticket