import RelatedTicket from './RelatedTicket'
import RelatedTicketAdd from '../RelatedTicketAdd'
import Dialog from '../../../../Layout/Dialog'
import MaterialContainer from '@mui/material/Container'
import MaterialTable from '@mui/material/Table'
import MaterialTableBody from '@mui/material/TableBody'
import MaterialTableCell from '@mui/material/TableCell'
import MaterialTableContainer from '@mui/material/TableContainer'
import MaterialTableHead from '@mui/material/TableHead'
import MaterialTableRow from '@mui/material/TableRow'
import MaterialIconButton from '@mui/material/IconButton'
import MaterialAddIcon from '@mui/icons-material/Add'

const Index = ({ code, ticket_no, related_tickets, inverse_related_tickets, currentUser, getUpdatedTicket, useState, ticketData }) => {
    const [ open, setOpen ] = useState(false)
    const handleOpen = () => { setOpen(true) }
    const handleClose = () => { setOpen(false) }
    const totalRelatedTickets = related_tickets.length > 0 && inverse_related_tickets.length > 0 ? [...related_tickets, ...inverse_related_tickets] : related_tickets.length > 0 ? related_tickets : inverse_related_tickets

    return (
        <>
        <MaterialContainer maxWidth = 'md'>
            <MaterialTableContainer>
                <MaterialTable size="small" aria-label="a dense table">
                    <MaterialTableHead>
                        <MaterialTableRow>
                            <MaterialTableCell colSpan={3}>
                                Related Bugs
                            </MaterialTableCell>
                            <MaterialTableCell>
                                <MaterialIconButton color="primary" aria-label="upload picture" component="span" onClick={handleOpen}>
                                    <MaterialAddIcon />
                                </MaterialIconButton>
                            </MaterialTableCell>
                        </MaterialTableRow>
                    </MaterialTableHead>
                    <MaterialTableBody>
                    {   totalRelatedTickets.length > 0 && totalRelatedTickets
                            .map( relatedTicket => {
                                return <RelatedTicket
                                            key = { relatedTicket.id } 
                                            code = { code }
                                            ticket_no = { ticket_no }
                                            relatedTicket = { relatedTicket }
                                            getNewRelatedTickets = { getUpdatedTicket }
                                            currentUser = { currentUser }
                                        />
                            }) 
                        }
                    </MaterialTableBody>
                </MaterialTable>
            </MaterialTableContainer>
        </MaterialContainer>
        <Dialog
            open={open}
            setOpen={setOpen}
            maxWidth = 'md'
            title='Add Related Ticket'
        >
            <RelatedTicketAdd
                code = { code }
                ticket_no = { ticket_no }
                handleclose = { handleClose } 
                getUpdatedTicket = { getUpdatedTicket }
                ticketData = { ticketData }
            />
        </Dialog>
        </>
    );
};

export default Index;