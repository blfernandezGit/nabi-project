import {useContext, useEffect, useState} from 'react';
import {AppContext} from '../../Context/AppContext';
import {useQuery} from 'react-query';
import {apiClient} from '../../Helpers/apiClient';
import useDebounce from '../../Helpers/useDebounce';
import {currentUserProjectsUrl} from '../../Helpers/constants';
import Project from './Project';
import Search from '../Layout/Search';
import MainLoading from '../Layout/LoadingScreen/MainLoading';
import {ColumnContainer, LogoImg, TitleContainer} from '../Layout/Elements';
import nabi_logo_img from '../../../assets/nabi_logo_img.png';
import MaterialTableContainer from '@mui/material/TableContainer';
import MaterialTable from '@mui/material/Table';
import MaterialTableBody from '@mui/material/TableBody';
import MaterialTypography from '@mui/material/Typography';
import MaterialContainer from '@mui/material/Container';
import MaterialGrid from '@mui/material/Grid';

const Index = () => {
  const {currentUser, title, setTitle} = useContext( AppContext );
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const debouncedFilter = useDebounce(filter, 500);

  const {isLoading: isLoadingCurrentUserProjects, data: currentUserProjectsData} = useQuery(`${currentUser?.details?.username}_projects`, apiClient(currentUserProjectsUrl, currentUser.headers, null, 'GET'), {retry: false});
  useEffect(() => {
    setIsLoading( isLoadingCurrentUserProjects );
    setTitle('My Projects');
    // eslint-disable-next-line
    }, [ isLoadingCurrentUserProjects ])

  return (
    <ColumnContainer maxWidth='xl'>
      <MainLoading isLoading = { isLoading } />
      <TitleContainer maxWidth = 'md'>
        <MaterialGrid container>
          <MaterialGrid item xs={12} sm={12} md={6}>
            <TitleContainer>
              <LogoImg
                src={nabi_logo_img}
              />
              <MaterialTypography
                variant = "h4"
                sx ={{my: 2}}>
                {title}
              </MaterialTypography>
            </TitleContainer>
          </MaterialGrid>
          <MaterialGrid item xs={12} sm={12} md={6}>
            <TitleContainer sx = {{height: '100%'}}>
              <Search setFilter = { setFilter } label = 'Search Projects' />
            </TitleContainer>
          </MaterialGrid>
        </MaterialGrid>
      </TitleContainer>
      <MaterialContainer maxWidth = 'md'>
        <MaterialTableContainer>
          <MaterialTable>
            <MaterialTableBody>
              { currentUserProjectsData &&
                                currentUserProjectsData
                                    .filter( (project) => {
                                      return ['name', 'description'].some((key) => project?.attributes[key].toLowerCase().includes(debouncedFilter.toLowerCase()));
                                    })
                                    .map( (project) => {
                                      return <Project
                                        key = { project.id }
                                        project = { project }
                                        MaterialTypography = { MaterialTypography }
                                      />;
                                    })
              }
            </MaterialTableBody>
          </MaterialTable>
        </MaterialTableContainer>
      </MaterialContainer>
    </ColumnContainer>
  );
};

export default Index;
