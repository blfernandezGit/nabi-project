import { useEffect, useState } from 'react'
import { dateFormatter, userListUrl } from '../../../../../Helpers/constants'
import { Paper, Avatar } from './customComponents'
import { TitleContainer } from '../../../../Layout/Elements'
import useHooks from '../hooks'
import MaterialTypography from '@mui/material/Typography'
import MaterialIconButton from '@mui/material/IconButton'
import MaterialEditIcon from '@mui/icons-material/Edit'
import CommentEdit from '../CommentEdit'
import { CommentContainer } from '../customComponents'
import MaterialModal from '@mui/material/Modal'


const Comment = ({ code,ticket_no, getNewComments, comment, apiClient, useQuery, currentUser }) => {
    const commentDetails = comment?.attributes
    const {  stringAvatar } = useHooks()
    const [ isAuthor, setIsAuthor ] = useState()
    const [ open, setOpen ] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const {isLoading: isLoadingUsers, data: usersData, refetch: getUsersData } = useQuery('userList', apiClient(`${userListUrl}`, currentUser.headers, null, 'GET'), {retry: false, enabled:false})
    const author = usersData && commentDetails?.user_id && usersData.filter(author => author?.id === commentDetails?.user_id )[0]?.attributes

    useEffect(() => {
        if( author?.username === currentUser?.details?.username ) {
            setIsAuthor( true )
        }
        // eslint-disable-next-line
    }, [ isLoadingUsers ])

    return (
        <>
        <Paper sx = {{ my: 2, py: 2 }}>
            <TitleContainer sx = {{ m: 1 }}>
                {author &&
                    <>
                        <Avatar {...stringAvatar(`${author?.first_name} ${author?.last_name}`)}/>
                        <MaterialTypography
                            variant = "h7"
                            sx = {{ m: 1 }}>
                            {author?.username}
                            { isAuthor &&
                                <MaterialIconButton size = 'small' color = 'secondary' component = 'span' onClick = {handleOpen}>
                                    <MaterialEditIcon />
                                </MaterialIconButton>
                            }
                        </MaterialTypography>
                    </>
                }
            </TitleContainer>
            <MaterialTypography
                variant = "body1"
                sx = {{ m: 2 }}>
                { commentDetails?.comment_text }
            </MaterialTypography>
        </Paper>
        <MaterialModal
            open={open}
            onClose={handleClose}
            aria-labelledby="edit-comment-modal"
            aria-describedby="modal-for-editing-comments"
            sx = {{overflow: 'scroll'}}
        >
            <CommentContainer maxWidth="md" sx={{borderRadius: 2}}>
                <CommentEdit 
                    code = { code } 
                    ticket_no = { ticket_no }
                    handleOpen = { handleOpen }
                    handleclose = { handleClose } 
                    getNewComments = { getNewComments }
                    commentId = { comment?.id }
                    origCommentText = { commentDetails?.comment_text }
                />
            </CommentContainer>
        </MaterialModal>
        </>
    );
};

export default Comment