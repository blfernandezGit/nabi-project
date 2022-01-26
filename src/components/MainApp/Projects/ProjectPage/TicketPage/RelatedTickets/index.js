import RelatedTicket from './RelatedTicket'
import MaterialContainer from '@mui/material/Container'
import MaterialTable from '@mui/material/Table';
import MaterialTableBody from '@mui/material/TableBody';
import MaterialTableCell from '@mui/material/TableCell';
import MaterialTableContainer from '@mui/material/TableContainer';
import MaterialTableHead from '@mui/material/TableHead';
import MaterialTableRow from '@mui/material/TableRow';

const Index = ({ code, ticket_no, related_tickets, inverse_related_tickets, currentUser, getUpdatedTicket }) => {
    const totalRelatedTickets = related_tickets.length > 0 && inverse_related_tickets.length > 0 ? [...related_tickets, ...inverse_related_tickets] : related_tickets.length > 0 ? related_tickets : inverse_related_tickets

    return (
        <>
        <MaterialContainer maxWidth = 'md'>
            <MaterialTableContainer>
                <MaterialTable size="small" aria-label="a dense table">
                    <MaterialTableBody>
                        { totalRelatedTickets && 
                            totalRelatedTickets
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
        </>
    );
};

export default Index;