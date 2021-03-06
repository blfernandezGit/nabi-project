import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../Context/AppContext'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { apiClient } from '../../../../Helpers/apiClient'
import useHooks from './hooks'
import { projectListUrl, ticketListUrl, detailedDateFormatter } from '../../../../Helpers/constants'
import { ColumnContainer, TitleContainer } from '../../../Layout/Elements'
import FloatingButton from '../../../Layout/FloatingButton'
import TicketEdit from '../TicketEdit'
import Comments from './Comments'
import Photos from './Photos'
import RelatedTickets from './RelatedTickets'
import CommentCreate from './CommentCreate'
import Dialog from '../../../Layout/Dialog'
import MainLoading from '../../../Layout/LoadingScreen/MainLoading'
import MaterialTypography from '@mui/material/Typography'
import MaterialContainer from '@mui/material/Container'
import MaterialChip from '@mui/material/Chip'
import MaterialAvatar from '@mui/material/Avatar'
import MaterialMessageIcon from '@mui/icons-material/Message'
import MaterialEditIcon from '@mui/icons-material/Edit'
import MaterialIconButton from '@mui/material/IconButton'
import MaterialStack from '@mui/material/Stack'

const Index = () => {
    const { currentUser, setTitle } = useContext( AppContext )
    const { code, ticket_no } = useParams()
    const [ color, setColor ] = useState('default')
    const {  stringAvatar } = useHooks()
    const [ open, setOpen ] = useState(false)
    const [ openComment, setOpenComment ] = useState(false)
    const [ isAuthor, setIsAuthor ] = useState()
    const [ isLoading, setIsLoading ] = useState()
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleOpenComment = () => setOpenComment(true)
    const handleCloseComment = () => setOpenComment(false)

    const { isLoading: isLoadingTicket, data: ticketData, refetch: getUpdatedTicket } = useQuery( `${ code }_${ ticket_no }`, apiClient(`${projectListUrl}/${code}/${ticketListUrl}/${ticket_no}`, currentUser.headers, null, 'GET' ), {retry: false})
    const ticketDetails = ticketData?.attributes
   
    const assignee = ticketDetails?.assignee
    const author = ticketDetails?.author

    useEffect(() => {
        if( author?.username === currentUser?.details?.username ) {
            setIsAuthor( true )
        }
        // eslint-disable-next-line
    }, [ author ])
    
    useEffect(() => {
        setIsLoading( isLoadingTicket )
        setTitle(code)
        // eslint-disable-next-line
    }, [ isLoadingTicket ])

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
                    { isAuthor &&
                        <MaterialIconButton size = 'small' color = 'secondary' component = 'span' onClick = {handleOpen}>
                            <MaterialEditIcon />
                        </MaterialIconButton>
                    }
                </MaterialTypography>
            </TitleContainer>
            <TitleContainer maxWidth = 'md' sx = {{ mb: 2 }}>
                <MaterialStack 
                    direction={{ xs: 'column', sm: 'column', md: 'row' }}
                    spacing={1}>
                {ticketData &&
                    <MaterialChip 
                        label={`${author?.username} on ${ detailedDateFormatter.format(Date.parse(ticketDetails?.created_at)) }`}
                        avatar={<MaterialAvatar {...stringAvatar(`${author.first_name} ${author.last_name}`)}/>}
                    />
                }
                {ticketData && assignee?.username &&
                    <MaterialChip label={`Assigned to: ${assignee?.username}`} color={color} variant="outlined"></MaterialChip>
                }
                </MaterialStack>
            </TitleContainer>
            <MainLoading isLoading = { isLoading } />
            <MaterialContainer maxWidth = 'md'>
                <MaterialTypography
                    variant = "body1"
                    sx ={{mb: 2, whiteSpace: 'pre-line'}}>
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
                        sx ={{mb: 2, whiteSpace: 'pre-line'}}>
                        {ticketDetails?.resolution}
                    </MaterialTypography>
                </MaterialContainer>
            }
            {ticketDetails?.image?.url && <Photos image = { ticketDetails?.image }/>}
            <RelatedTickets 
                related_tickets = { ticketDetails?.related_tickets || [] } 
                inverse_related_tickets = { ticketDetails?.inverse_related_tickets || [] } 
                getUpdatedTicket = { getUpdatedTicket } 
                currentUser = { currentUser } 
                code = { code } 
                ticket_no = { ticket_no } 
                useState = { useState }
                ticketData = { ticketData }
            />
            <Comments comments = { ticketDetails?.comments } getUpdatedTicket = { getUpdatedTicket } currentUser = { currentUser } code = { code } ticket_no = { ticket_no }/>
            <Dialog
                open={open}
                setOpen={setOpen}
                maxWidth = 'md'
                title='Edit Comment'
            >
                <TicketEdit
                    origTitle = { ticketDetails?.title } 
                    origDescription = {ticketDetails?.description}
                    origStatus = { ticketDetails?.status }
                    origAssignee = { ticketDetails?.assignee?.username ? {label: ticketDetails?.assignee?.username, id: ticketDetails?.assignee?.id} : null }
                    origResolution = { ticketDetails?.resolution }
                    origImage = { ticketDetails?.image?.url }
                    code = { code } 
                    ticket_no = { ticketDetails?.ticket_no }
                    handleclose = { handleClose } 
                    getUpdatedTicket = { getUpdatedTicket }
                />
            </Dialog>
            <FloatingButton Icon = { MaterialMessageIcon } func = { handleOpenComment }/>
            <Dialog
                open={openComment}
                setOpen={setOpenComment}
                maxWidth = 'md'
                title='Add Comment'
            >
                    <CommentCreate 
                        code = { code } 
                        ticket_no = { ticketDetails?.ticket_no }
                        handleclose = { handleCloseComment } 
                        getNewComments = { getUpdatedTicket }
                    />
            </Dialog>
        </ColumnContainer>
    );
};

export default Index;
