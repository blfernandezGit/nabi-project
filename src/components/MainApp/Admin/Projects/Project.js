import {useState} from 'react';
import {Link} from 'react-router-dom';
import {dateFormatter} from '../../../Helpers/constants';
import ProjectEdit from './ProjectEdit';
import ProjectDelete from './ProjectDelete';
import Dialog from '../../Layout/Dialog';
import MaterialDeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MaterialEditIcon from '@mui/icons-material/Edit';
import MaterialIconButton from '@mui/material/IconButton';
import MaterialLink from '@mui/material/Link';

const Project = ({project, getNewProjects, HideTableCell, MaterialTableCell, MaterialTableRow, MaterialTypography, FormContainer}) => {
  const projectDetails = project.attributes;
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

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
      <Dialog
        open={openEdit}
        setOpen={setOpenEdit}
        maxWidth = 'md'
        title='Edit Project'
      >
        <ProjectEdit
          code = { projectDetails?.code }
          handleOpen = { handleOpenEdit }
          handleclose = { handleCloseEdit }
          getNewProjects = { getNewProjects }
          origName = { projectDetails?.name }
          origDescription = { projectDetails?.description }
        />
      </Dialog>
      <Dialog
        open={openDelete}
        setOpen={setOpenDelete}
        maxWidth = 'md'
        title='Delete Project'
      >
        <ProjectDelete
          code = { projectDetails?.code }
          projectName = { projectDetails?.name }
          handleOpen = { handleOpenDelete }
          handleclose = { handleCloseDelete }
          getNewProjects = { getNewProjects }
        />
      </Dialog>
    </>
  );
};

export default Project;
