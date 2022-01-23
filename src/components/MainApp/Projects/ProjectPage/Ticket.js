import { useState } from 'react'
import { Link } from "react-router-dom"
import { dateFormatter } from '../../../Helpers/constants'
import MaterialBugReportIcon from '@mui/icons-material/BugReport'
import MaterialChip from '@mui/material/Chip'

const Ticket = ({ ticket, ticketData, useEffect, apiClient, useQuery, userListUrl, currentUser, HideTableCell, MaterialTableCell, MaterialTableRow, MaterialTypography }) => {
    const ticketDetails = ticket?.attributes
    const [ color, setColor ] = useState('error')

    // useEffect(() => { 
    //     ticketDetails?.assignee_id && getUsersData()
    //     // eslint-disable-next-line
    // }, [ticketDetails?.assignee_id])

    useEffect(() => {
        switch(ticketDetails?.status){
            case 'Open':
                setColor('error')
                break
            case 'ForFixing':
                setColor('warning')
                break
            case 'ForTesting':
                setColor('info')
                break
            case 'Closed':
                setColor('success')
                break
            default:
                setColor('secondary')
        }
        //eslint-disable-next-line
    }, [ticketData])

    // const {isLoading: isLoadingUsers, data: usersData, refetch: getUsersData } = useQuery('userList', apiClient(`${userListUrl}`, currentUser.headers, null, 'GET'), {retry: false, enabled:false})
    // const assignee = usersData && ticketDetails?.assignee_id && usersData.filter(assignee => assignee?.id === ticketDetails?.assignee_id )[0]?.attributes

    return (
        <MaterialTableRow>
            <HideTableCell>
                <MaterialTypography>
                    #{ ticketDetails?.ticket_no }
                </MaterialTypography>
            </HideTableCell>
            <MaterialTableCell>
                <Link to={`${ticketDetails?.ticket_no}`} style = {{textDecoration: 'none', color: 'black'}}>
                <MaterialTypography>
                    { ticketDetails?.title }
                </MaterialTypography>
                </Link>
            </MaterialTableCell>
            <MaterialTableCell>
                <MaterialChip
                    label = { ticketDetails?.status }
                    color = {color}
                    sx = {{ width: 90}}
                />
            </MaterialTableCell>
            {/* <HideTableCell>
                {assignee &&
                    <MaterialTypography>
                        { assignee?.username }
                    </MaterialTypography>
                }
            </HideTableCell> */}
            <HideTableCell>
                <MaterialTypography>
                    { dateFormatter.format(Date.parse(ticketDetails?.created_at)) }
                </MaterialTypography>
            </HideTableCell>
            <HideTableCell>
                <MaterialTypography>
                    { dateFormatter.format(Date.parse(ticketDetails?.updated_at)) }
                </MaterialTypography>
            </HideTableCell>
        </MaterialTableRow>
    );
};

export default Ticket