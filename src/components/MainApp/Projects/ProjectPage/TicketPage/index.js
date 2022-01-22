import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../Context/AppContext'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { apiClient } from '../../../../Helpers/apiClient'
import useHooks from './hooks'
import { userListUrl, projectListUrl, ticketListUrl } from '../../../../Helpers/constants'
import { ColumnContainer, TitleContainer } from '../../../Layout/Elements'
import FloatingButton from '../../../FloatingButton'
import TicketEdit from '../TicketEdit'
import Comments from './Comments'
import { FormContainer } from '../customComponents'
import MaterialTypography from '@mui/material/Typography'
import MaterialContainer from '@mui/material/Container'
import MaterialChip from '@mui/material/Chip'
import MaterialAvatar from '@mui/material/Avatar'
import MaterialMessageIcon from '@mui/icons-material/Message'
import MaterialEditIcon from '@mui/icons-material/Edit'
import MaterialFab from '@mui/material/Fab'
import MaterialModal from '@mui/material/Modal'

const Index = () => {
    const { currentUser } = useContext( AppContext )
    const { code, ticket_no } = useParams()
    const [ color, setColor ] = useState('default')
    const {  stringAvatar } = useHooks()
    const [ open, setOpen ] = useState(false)
    const [ openComment, setOpenComment ] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleOpenComment = () => setOpenComment(true)
    const handleCloseComment = () => setOpenComment(false)

    const { isLoading: isLoadingTicket, data: ticketData, refetch: getUpdatedTicket } = useQuery( `${ code }_${ticket_no}`, apiClient(`${projectListUrl}/${code}/${ticketListUrl}/${ticket_no}`, currentUser.headers, null, 'GET' ), {retry: false})
    const ticketDetails = ticketData?.attributes
    const {isLoading: isLoadingUsers, data: usersData, refetch: getUsersData } = useQuery('userList', apiClient(`${userListUrl}`, currentUser.headers, null, 'GET'), {retry: false})
    const assignee = usersData && ticketDetails?.assignee_id && usersData.filter(assignee => assignee?.id === ticketDetails?.assignee_id )[0]?.attributes
    const author = usersData && usersData.filter(author => author?.id === ticketDetails?.author_id )[0]?.attributes

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
            case 'Cancelled':
                setColor('secondary')
                break
            default:
                setColor('default')
        }
        //eslint-disable-next-line
    }, [isLoadingTicket, ticketData])

    return (
        <ColumnContainer maxWidth = 'xl'>
            <MaterialContainer maxWidth = 'md'>
                <MaterialChip
                    label = { ticketDetails?.status }
                    color = {color}
                    sx = {{ width: 100, my: 3}}
                />
            </MaterialContainer>
            <TitleContainer maxWidth = 'md'>
                <MaterialTypography
                    variant = "h5">
                    #{ticketDetails?.ticket_no}: {ticketDetails?.title}
                    <MaterialFab size = 'small' aria-label="edit" sx = {{ mx: 2}}  onClick = {handleOpen}>
                        <MaterialEditIcon />
                    </MaterialFab>
                </MaterialTypography>
            </TitleContainer>
            <TitleContainer maxWidth = 'md' sx = {{ my: 2 }}>
                {author &&
                    <>
                        <MaterialAvatar  {...stringAvatar(`${author.first_name} ${author.last_name}`)}/>
                        <MaterialTypography
                            variant = "h7"
                            sx = {{ m: 1 }}>
                            {author?.username}
                        </MaterialTypography>
                    </>
                }
            </TitleContainer>
            <MaterialContainer maxWidth = 'md'>
                <MaterialTypography
                    variant = "body1"
                    sx ={{mb: 2}}>
                    {ticketDetails?.description}
                </MaterialTypography>
            </MaterialContainer>
            {ticketDetails?.resolution &&
                <MaterialContainer maxWidth = 'md'>
                    <MaterialTypography
                        variant = "h6"
                        sx ={{mb: 2}}>
                        Resolution
                    </MaterialTypography>
                    <MaterialTypography
                        variant = "body1"
                        sx ={{mb: 2}}>
                        {ticketDetails?.resolution}
                    </MaterialTypography>
                </MaterialContainer>
            }
            <Comments code = { code } ticket_no = { ticket_no } currentUser = { currentUser }/>
            <MaterialModal
                open={open}
                onClose={handleClose}
                aria-labelledby="edit-ticket-modal"
                aria-describedby="modal-for-ticket-editing"
                sx = {{overflow: 'scroll'}}
            >
                <FormContainer maxWidth="md" sx={{borderRadius: 2}}>
                    <TicketEdit 
                        origTitle = { ticketDetails?.title } 
                        origDescription = {ticketDetails?.description}
                        origStatus = { ticketDetails?.status }
                        origAssignee = { ticketDetails?.assignee_id }
                        origResolution = { ticketDetails?.resolution }
                        code = { code } 
                        ticket_no = { ticketDetails?.ticket_no }
                        handleclose = { handleClose } 
                        getUpdatedTicket = { getUpdatedTicket }
                    />
                </FormContainer>
            </MaterialModal>
            <FloatingButton Icon = { MaterialMessageIcon }/>
            {/* <MaterialModal
                open={open}
                onClose={handleCloseComment}
                aria-labelledby="edit-ticket-modal"
                aria-describedby="modal-for-ticket-editing"
                sx = {{overflow: 'scroll'}}
            >
                <FormContainer maxWidth="md" sx={{borderRadius: 2}}>
                    <AddComment 
                        code = { code } 
                        ticket_no = { ticketDetails?.ticket_no }
                        handleclose = { handleCloseComment } 
                        getUpdatedTicket = { getUpdatedTicket }
                    />
                </FormContainer>
            </MaterialModal> */}
        </ColumnContainer>
    );
};

export default Index;
