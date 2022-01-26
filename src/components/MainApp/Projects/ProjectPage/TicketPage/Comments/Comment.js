import { useEffect, useState } from 'react'
import { detailedDateFormatter } from '../../../../../Helpers/constants'
import { Paper, Avatar } from './customComponents'
import { TitleContainer } from '../../../../Layout/Elements'
import useHooks from '../hooks'
import MaterialTypography from '@mui/material/Typography'
import MaterialIconButton from '@mui/material/IconButton'
import MaterialEditIcon from '@mui/icons-material/Edit'
import CommentEdit from '../CommentEdit'
import { CommentContainer } from '../customComponents'
import MaterialModal from '@mui/material/Modal'
import MaterialChip from '@mui/material/Chip'
import MaterialAvatar from '@mui/material/Avatar'


const Comment = ({  code, ticket_no, getNewComments, comment, currentUser }) => {
    const {  stringAvatar } = useHooks()
    const [ isAuthor, setIsAuthor ] = useState()
    const [ open, setOpen ] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    useEffect(() => {
        if( comment?.author?.username === currentUser?.details?.username ) {
            setIsAuthor( true )
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
        <Paper sx = {{ my: 2, py: 2 }}>
            <TitleContainer sx={{justifyContent: 'space-between'}}>
                {comment?.author &&
                    <>
                    <MaterialChip 
                        label={`${comment?.author?.username} on ${ detailedDateFormatter.format(Date.parse(comment?.created_at)) }`}
                        avatar={<MaterialAvatar {...stringAvatar(`${comment?.author?.first_name} ${comment?.author?.last_name}`)}/>}
                        variant="outlined"
                    />
                        { isAuthor &&
                            <MaterialIconButton size = 'small' component = 'span' onClick = {handleOpen}>
                                <MaterialEditIcon />
                            </MaterialIconButton>
                        }
                    </>
                }
            </TitleContainer>
            <MaterialTypography
                variant = "body1"
                sx = {{ m: 2 }}>
                { comment?.comment_text }
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
                    origCommentText = { comment?.comment_text }
                />
            </CommentContainer>
        </MaterialModal>
        </>
    );
};

export default Comment