import {projectListUrl} from '../../../Helpers/constants';

const Project = ({username, project, Link, ListItem, ListItemIcon, ListItemText}) => {
  const projectDetails = project?.attributes;
  const splitName = projectDetails?.name.split(' ');
  return (
    <ListItem button key={ project?.id } component = { Link } to={`/app/${ username }/${projectListUrl}/${projectDetails.code}`} replace>
      <ListItemIcon>
        {splitName[0][0]}{splitName[splitName.length - 1][0]}
      </ListItemIcon>
      <ListItemText primary={projectDetails?.name} />
    </ListItem>
  );
};

export default Project;
