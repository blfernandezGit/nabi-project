import {projectListUrl, userListUrl} from '../../../../Helpers/constants';
import {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {AppContext} from '../../../../Context/AppContext';
import User from './User';
import AddProjectUsers from './AddProjectUsers';
import {useQuery} from 'react-query';
import {apiClient} from '../../../../Helpers/apiClient';
import {ColumnContainer, TitleContainer, LogoImg, HideTableCell, FormContainer} from '../../../Layout/Elements';
import useDebounce from '../../../../Helpers/useDebounce';
import Dialog from '../../../Layout/Dialog';
import MainLoading from '../../../Layout/LoadingScreen/MainLoading';
import Search from '../../../Layout/Search';
import FloatingButton from '../../../Layout/FloatingButton';
import nabi_logo_img from '../../../../../assets/nabi_logo_img.png';
import MaterialTableContainer from '@mui/material/TableContainer';
import MaterialTable from '@mui/material/Table';
import MaterialTableBody from '@mui/material/TableBody';
import MaterialTableHeader from '@mui/material/TableHead';
import MaterialTableRow from '@mui/material/TableRow';
import MaterialTableCell from '@mui/material/TableCell';
import MaterialTypography from '@mui/material/Typography';
import MaterialContainer from '@mui/material/Container';
import MaterialAddIcon from '@mui/icons-material/Add';
import MaterialGrid from '@mui/material/Grid';

const Index = () => {
  const {project_code} = useParams();
  const {currentUser, setIsLoading, title, setTitle} = useContext( AppContext );
  const [filter, setFilter] = useState('');
  const debouncedFilter = useDebounce(filter, 500);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {isLoading: isLoadingProject, data: projectData, refetch: getNewUsers} = useQuery(`${project_code}`, apiClient(`${projectListUrl}/${project_code}`, currentUser.headers, null, 'GET'), {retry: false});
  const {isLoading: isLoadingUsers, data: usersData} = useQuery('users', apiClient(`${userListUrl}`, currentUser.headers, null, 'GET'), {retry: false});
  const projectDetails = projectData?.attributes;

  useEffect(() => {
    setIsLoading( isLoadingProject || isLoadingUsers );
    setTitle(`Users in ${ projectDetails?.name }`);
    // eslint-disable-next-line
    }, [ isLoadingProject, isLoadingUsers ])

  const projectUsers = projectDetails?.users;

  return (
    <ColumnContainer maxWidth = 'xl'>
      <MainLoading isLoading = { isLoadingProject } />
      <TitleContainer maxWidth = 'l'>
        <MaterialGrid container>
          <MaterialGrid item xs={12} sm={12} md={6}>
            <TitleContainer>
              <LogoImg
                src={nabi_logo_img}
              />
              <MaterialTypography
                variant = "h4"
                sx ={{my: 2}}>
                                Users in { project_code }
              </MaterialTypography>
            </TitleContainer>
          </MaterialGrid>
          <MaterialGrid item xs={12} sm={12} md={6}>
            <TitleContainer sx = {{height: '100%'}}>
              <Search setFilter = { setFilter } label = 'Search Users' />
            </TitleContainer>
          </MaterialGrid>
        </MaterialGrid>
      </TitleContainer>
      <MaterialContainer maxWidth = 'l'>
        <MaterialTableContainer>
          <MaterialTable>
            <MaterialTableHeader>
              <MaterialTableRow>
                <MaterialTableCell>
                                        Username
                </MaterialTableCell>
                <HideTableCell>
                                        First Name
                </HideTableCell>
                <HideTableCell>
                                        Last Name
                </HideTableCell>
                <HideTableCell>
                                        Email Address
                </HideTableCell>
                <HideTableCell>
                                        Created At
                </HideTableCell>
                <HideTableCell>
                                        Updated At
                </HideTableCell>
              </MaterialTableRow>
            </MaterialTableHeader>
            <MaterialTableBody>
              { projectUsers &&
                                projectUsers
                                    .filter( (user) => debouncedFilter === '' || user?.attributes?.username?.toLowerCase().includes(debouncedFilter?.toLowerCase()) )
                                    .map( (user) => {
                                      return <User
                                        key = { user.username }
                                        user = { user }
                                        projectUsers = { projectUsers }
                                        HideTableCell = { HideTableCell }
                                        MaterialTableCell = { MaterialTableCell }
                                        MaterialTableRow = { MaterialTableRow }
                                        MaterialTypography = { MaterialTypography }
                                        FormContainer = { FormContainer }
                                      />;
                                    })
              }
            </MaterialTableBody>
          </MaterialTable>
        </MaterialTableContainer>
      </MaterialContainer>
      <Dialog
        open={open}
        setOpen={setOpen}
        maxWidth = 'md'
        title={`Add Users to ${project_code}`}
      >
        <AddProjectUsers
          handleclose = { handleClose }
          getNewProjects = { getNewUsers }
          usersData = { usersData }
          projectUsers = { projectUsers }
          projectData = { projectData }
        />
      </Dialog>
      { usersData && projectUsers && (projectUsers.length !== usersData.length) &&
                <FloatingButton Icon= { MaterialAddIcon } func = {handleOpen}/>
      }
    </ColumnContainer>
  );
};

export default Index;
