import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../Context/AppContext'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { userListUrl, projectListUrl, ticketListUrl } from '../../../Helpers/constants'
import { apiClient } from '../../../Helpers/apiClient'
import { ColumnContainer, TitleContainer, LogoImg } from '../../Layout/Elements'
import useDebounce from '../../../Helpers/useDebounce'
import MainLoading from '../../LoadingScreen/MainLoading'
import Search from '../../Search'
import Ticket from './Ticket'
import TicketCreate from './TicketCreate'
import FloatingButton from '../../FloatingButton'
import nabi_logo_img from '../../../../assets/nabi_logo_img.png'
import { HideTableCell, FormContainer } from './customComponents'
import MaterialTableContainer from '@mui/material/TableContainer'
import MaterialTable from '@mui/material/Table'
import MaterialTableBody from '@mui/material/TableBody'
import MaterialTableHeader from '@mui/material/TableHead'
import MaterialTableRow from '@mui/material/TableRow'
import MaterialTableCell from '@mui/material/TableCell'
import MaterialTypography from '@mui/material/Typography'
import MaterialContainer from '@mui/material/Container'
import MaterialAddIcon from '@mui/icons-material/Add'
import MaterialModal from '@mui/material/Modal'

// TODO: how to search like google - not exact
const Index = () => {
    const { code } = useParams()
    const { currentUser } = useContext( AppContext )
    const [ isLoading, setIsLoading ] = useState()
    const [ filter, setFilter ] = useState('')
    const debouncedFilter = useDebounce(filter, 500)
    const [ open, setOpen ] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const { isLoading: isLoadingProject, data: projectData } = useQuery( `${ code }`, apiClient(`${projectListUrl}/${code}`, currentUser.headers, null, 'GET' ), {retry: false})
    const { isLoading: isLoadingTicket, data: ticketData, refetch: getNewTickets} = useQuery( `${ code }_ticketsData`, apiClient(`${projectListUrl}/${code}/${ticketListUrl}`, currentUser.headers, null, 'GET' ), {retry: false})
    
    const projectDetails = projectData?.attributes

    useEffect(() => {
        setIsLoading( isLoadingTicket || isLoadingProject )
        // eslint-disable-next-line
    }, [ isLoadingTicket, isLoadingProject ])

    return (
        <ColumnContainer maxWidth='xl'>
            <MainLoading isLoading = { isLoading } />
            <TitleContainer maxWidth='md'>
                <LogoImg
                    src={nabi_logo_img}
                />
                <MaterialTypography
                    variant = "h4"
                    sx ={{my: 2}}>
                    {projectDetails?.name}
                </MaterialTypography>
            </TitleContainer>
            <Search setFilter = { setFilter } label = 'Search Tickets' />
            <MaterialContainer maxWidth = 'md'>
                    <MaterialTableContainer>
                        <MaterialTable>
                                <MaterialTableHeader>
                                <MaterialTableRow>
                                    <HideTableCell>
                                        #
                                    </HideTableCell>
                                    <MaterialTableCell>
                                        Title
                                    </MaterialTableCell>
                                    <MaterialTableCell>
                                        Status
                                    </MaterialTableCell>
                                    {/* <HideTableCell>
                                        Assignee
                                    </HideTableCell> */}
                                </MaterialTableRow>
                            </MaterialTableHeader>
                            <MaterialTableBody>
                            { ticketData && 
                                ticketData
                                .filter( ticket => debouncedFilter === '' || ticket?.attributes?.title?.toLowerCase().includes(debouncedFilter?.toLowerCase()) )
                                .map( ticket => {
                                    return <Ticket
                                                key = { ticket.id } 
                                                ticket = { ticket }
                                                ticketData = { ticketData }
                                                userListUrl = { userListUrl }
                                                apiClient = { apiClient }
                                                useQuery = { useQuery }
                                                currentUser = { currentUser }
                                                useEffect = { useEffect }
                                                HideTableCell = { HideTableCell }
                                                MaterialTableCell = { MaterialTableCell }
                                                MaterialTableRow = { MaterialTableRow }
                                                MaterialTypography = { MaterialTypography }
                                            />
                                }) 
                            }
                            </MaterialTableBody> 
                        </MaterialTable>
                    </MaterialTableContainer>
            </MaterialContainer>
            <MaterialModal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <FormContainer maxWidth="md" sx={{borderRadius: 2}}>
                    <TicketCreate code = { code } handleclose = { handleClose } getNewTickets = { getNewTickets }/>
                </FormContainer>
            </MaterialModal>
            <FloatingButton Icon= { MaterialAddIcon } func = {handleOpen}/>
        </ColumnContainer>
    )
}

export default Index
