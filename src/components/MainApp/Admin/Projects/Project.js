import { useState } from 'react'
import { Link } from 'react-router-dom'
import { dateFormatter } from '../../../Helpers/constants'
import ProjectEdit from './ProjectEdit'
import ProjectDelete from './ProjectDelete'
import MaterialDeleteForeverIcon from '@mui/icons-material/DeleteForever'
import MaterialEditIcon from '@mui/icons-material/Edit'
import MaterialIconButton from '@mui/material/IconButton'
import MaterialModal from '@mui/material/Modal'
import MaterialLink from '@mui/material/Link'

const Project = ({ project, getNewProjects, HideTableCell, MaterialTableCell, MaterialTableRow, MaterialTypography, FormContainer }) => {
    const projectDetails = project.attributes
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
                            to={`${projectDetails?.code}`}
                            sx={{color: 'black'}}
                        >
                            { projectDetails?.name }
                        </MaterialLink>
                    </MaterialTypography>
                </MaterialTableCell>
                <HideTableCell>
                    <MaterialTypography>
                        { projectDetails?.description }
                    </MaterialTypography>
                </HideTableCell>
                <HideTableCell>
                    <MaterialTypography>
                        { projectDetails?.tickets?.length || 0 }
                    </MaterialTypography>
                </HideTableCell>
                <MaterialTableCell>
                    <Link to={`${projectDetails?.code}`} style = {{textDecoration: 'none', color: 'black'}}>
                        { projectDetails?.users?.length || 0 }
                    </Link>
                </MaterialTableCell>
                <HideTableCell>
                    <MaterialTypography>
                        { dateFormatter.format(Date.parse(projectDetails?.created_at)) }
                    </MaterialTypography>
                </HideTableCell>
                <HideTableCell>
                    <MaterialTypography>
                        { dateFormatter.format(Date.parse(projectDetails?.updated_at)) }
                    </MaterialTypography>
                </HideTableCell>
                <MaterialTableCell>
                    <MaterialIconButton size = 'small' color = 'secondary' component = 'span' onClick = {handleOpenEdit}>
                        <MaterialEditIcon />
                    </MaterialIconButton>
                </MaterialTableCell>
                <MaterialTableCell>
                    <MaterialIconButton size = 'small' color = 'error' component = 'span' onClick = {handleOpenDelete}>
                        <MaterialDeleteForeverIcon />
                    </MaterialIconButton>
                </MaterialTableCell>
            </MaterialTableRow>
            <MaterialModal
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="edit-project-modal"
                aria-describedby="modal-for-editing-projects"
                sx = {{overflow: 'scroll'}}
            >
                <FormContainer maxWidth="md" sx={{borderRadius: 2}}>
                    <ProjectEdit 
                        code = { projectDetails?.code } 
                        handleOpen = { handleOpenEdit }
                        handleclose = { handleCloseEdit } 
                        getNewProjects = { getNewProjects }
                        origName = { projectDetails?.name }
                        origDescription = { projectDetails?.description }
                    />
                </FormContainer>
            </MaterialModal>
            <MaterialModal
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="delete-project-modal"
                aria-describedby="modal-for-deleting-projects"
                sx = {{overflow: 'scroll'}}
            >
                <FormContainer maxWidth="md" sx={{borderRadius: 2}}>
                    <ProjectDelete 
                        code = { projectDetails?.code } 
                        projectName = { projectDetails?.name } 
                        handleOpen = { handleOpenDelete }
                        handleclose = { handleCloseDelete } 
                        getNewProjects = { getNewProjects }
                    />
                </FormContainer>
            </MaterialModal>
        </>
    )
}

export default Project
