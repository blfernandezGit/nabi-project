import { useState } from 'react'
import { detailedDateFormatter } from '../../../../../Helpers/constants'
import { TitleContainer } from '../../../../Layout/Elements'
import MaterialDeleteIcon from '@mui/icons-material/Delete'
import MaterialModal from '@mui/material/Modal'
import MaterialChip from '@mui/material/Chip'
import MaterialAvatar from '@mui/material/Avatar'
import MaterialTable from '@mui/material/Table';
import MaterialTableBody from '@mui/material/TableBody'
import MaterialTableCell from '@mui/material/TableCell'
import MaterialTableContainer from '@mui/material/TableContainer'
import MaterialTableHead from '@mui/material/TableHead'
import MaterialTableRow from '@mui/material/TableRow'
import MaterialIconButton from '@mui/material/IconButton'


const RelatedTicket = ({ code, ticket_no, getNewRelatedTickets, relatedTicket, currentUser }) => {
    const [ open, setOpen ] = useState(false)
    const handleDelete = () => setOpen(false)

    return (
        <>
        <MaterialTableRow>
          <MaterialTableCell scope="row">
            {relatedTicket?.ticket_no}
          </MaterialTableCell>
          <MaterialTableCell component="th" scope="row">
            {relatedTicket?.title}
          </MaterialTableCell>
          <MaterialTableCell scope="row">
            <MaterialChip 
              size="small"
              label={relatedTicket?.status}
              variant="outlined"
            />
          </MaterialTableCell>
          <MaterialTableCell scope="row">
            <MaterialIconButton size = 'small' component = 'span' onClick = {handleDelete}>
              <MaterialDeleteIcon />
            </MaterialIconButton>
          </MaterialTableCell>
        </MaterialTableRow>

            {/* <TitleContainer maxWidth='md' sx={{justifyContent: 'space-between'}}>
                    <>
                    <MaterialChip 
                        label={`${relatedTicket?.ticket_no} ${relatedTicket?.title} ${relatedTicket?.title}`}
                        variant="outlined"
                        onDelete={handleDelete}
                        deleteIcon={<MaterialDeleteIcon />}
                    />
                    </>
            </TitleContainer> */}
        {/* <MaterialModal
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
        </MaterialModal> */}
        </>
    );
};

export default RelatedTicket