import { Link } from "react-router-dom"
import { dateFormatter } from '../../../Helpers/constants'
import MaterialChip from '@mui/material/Chip'

const Ticket = ({ ticket, ticketsData, useEffect, useState, HideTableCell, MaterialTableCell, MaterialTableRow, MaterialTypography }) => {
    const ticketDetails = ticket?.attributes
    const [ color, setColor ] = useState('error')

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
    }, [ticketsData])

    return (
        <MaterialTableRow>
            <HideTableCell>
                <MaterialTypography component={Link} to={`${ticketDetails?.ticket_no}`} style = {{textDecoration: 'none', color: 'black'}}>
                    #{ ticketDetails?.ticket_no }
                </MaterialTypography>
            </HideTableCell>
            <MaterialTableCell>
                <MaterialTypography component={Link} to={`${ticketDetails?.ticket_no}`} style = {{textDecoration: 'none', color: 'black'}}>
                    { ticketDetails?.title }
                </MaterialTypography>
            </MaterialTableCell>
            <MaterialTableCell>
                <MaterialChip
                    label = { ticketDetails?.status }
                    color = {color}
                    sx = {{ width: 90}}
                />
            </MaterialTableCell>
            <HideTableCell>
                {ticketDetails?.assignee &&
                    <MaterialTypography>
                        { ticketDetails?.assignee?.username }
                    </MaterialTypography>
                }
            </HideTableCell>
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