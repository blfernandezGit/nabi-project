import { useState } from 'react'
import { Link } from "react-router-dom"
import { dateFormatter } from '../../../Helpers/constants'
import UserEdit from './UserEdit'
import UserDelete from './UserDelete'
import Dialog from '../../Layout/Dialog'
import MaterialDeleteForeverIcon from '@mui/icons-material/DeleteForever'
import MaterialEditIcon from '@mui/icons-material/Edit'
import MaterialIconButton from '@mui/material/IconButton'
import MaterialCancelIcon from '@mui/icons-material/Cancel'
import MaterialCheckCircleIcon from '@mui/icons-material/CheckCircle'
import MaterialLink from '@mui/material/Link'

const User = ({ user, getNewUsers, HideTableCell, MaterialTableCell, MaterialTableRow, MaterialTypography, FormContainer }) => {
    const userDetails = user.attributes
    const [ openEdit, setOpenEdit ] = useState(false)
    const handleOpenEdit = () => setOpenEdit(true)
    const handleCloseEdit = () => setOpenEdit(false)
    const [ openDelete, setOpenDelete ] = useState(false)
    const handleOpenDelete = () => setOpenDelete(true)
    const handleCloseDelete = () => setOpenDelete(false)

    return (
        <>
            <MaterialTableRow>
                <MaterialTableCell>
                    <MaterialTypography>
                        <MaterialLink
                            component={Link}
                            to={`${userDetails?.username}`}
                            sx={{color: 'black'}}
                        >
                            { userDetails?.username }
                        </MaterialLink>
                    </MaterialTypography>
                </MaterialTableCell>
                <HideTableCell>
                    <MaterialTypography>
                        { userDetails?.first_name }
                    </MaterialTypography>
                </HideTableCell>
                <HideTableCell>
                    <MaterialTypography>
                        { userDetails?.last_name }
                    </MaterialTypography>
                </HideTableCell>
                <HideTableCell>
                    <MaterialTypography>
                        { userDetails?.email }
                    </MaterialTypography>
                </HideTableCell>
                <HideTableCell>
                    <MaterialTypography>
                        { userDetails.author_tickets?.length || 0 }
                    </MaterialTypography>
                </HideTableCell>
                <HideTableCell>
                    <Link to={`${userDetails?.username}`} style = {{textDecoration: 'none', color: 'black'}}>
                        { userDetails?.projects?.length || 0 }
                    </Link>
                </HideTableCell>
                <MaterialTableCell>
                    {userDetails?.is_admin ?
                        <MaterialCheckCircleIcon color = 'success'/>
                        :
                        <MaterialCancelIcon/>
                    }
                </MaterialTableCell>
                <HideTableCell>
                    <MaterialTypography>
                        { dateFormatter.format(Date.parse(userDetails?.created_at)) }
                    </MaterialTypography>
                </HideTableCell>
                <HideTableCell>
                    <MaterialTypography>
                        { dateFormatter.format(Date.parse(userDetails?.updated_at)) }
                    </MaterialTypography>
                </HideTableCell>
                <MaterialTableCell>
                { userDetails?.username !== 'suppadmin' && userDetails?.username !== 'blfernandez' &&
                    <MaterialIconButton size = 'small' color = 'secondary' component = 'span' onClick = {handleOpenEdit}>
                        <MaterialEditIcon />
                    </MaterialIconButton>
                }
                </MaterialTableCell>
                <MaterialTableCell>
                { userDetails?.username !== 'suppadmin' && userDetails?.username !== 'blfernandez' &&
                    <MaterialIconButton size = 'small' color = 'error' component = 'span' onClick = {handleOpenDelete}>
                        <MaterialDeleteForeverIcon />
                    </MaterialIconButton>
                }
                </MaterialTableCell>
            </MaterialTableRow>
            <Dialog
                open={openEdit}
                setOpen={setOpenEdit}
                maxWidth = 'md'
                title='Edit User'
            >
                <UserEdit 
                    username = { userDetails?.username } 
                    handleOpen = { handleOpenEdit }
                    handleclose = { handleCloseEdit } 
                    getNewUsers = { getNewUsers }
                    origFirstName = { userDetails?.first_name }
                    origLastName = { userDetails?.last_name }
                    origIsAdmin = { userDetails?.is_admin }
                />
            </Dialog>
            <Dialog
                open={openDelete}
                setOpen={setOpenDelete}
                maxWidth = 'md'
                title='Delete User'
            >
                <UserDelete 
                    code = { userDetails?.code } 
                    username = { userDetails?.username } 
                    handleOpen = { handleOpenDelete }
                    handleclose = { handleCloseDelete } 
                    getNewUsers = { getNewUsers }
                />
            </Dialog>
        </>
    )
}

export default User
