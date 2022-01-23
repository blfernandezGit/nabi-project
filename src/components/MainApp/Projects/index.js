import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import { useQuery } from 'react-query'
import { apiClient } from '../../Helpers/apiClient'
import useDebounce from '../../Helpers/useDebounce'
import { userListUrl, projectListUrl, ticketListUrl } from '../../Helpers/constants'
import Project from './Project'
import Search from '../Layout/Search'
import MainLoading from '../Layout/LoadingScreen/MainLoading'
import { ColumnContainer, LogoImg, TitleContainer } from '../Layout/Elements'
import nabi_logo_img from '../../../assets/nabi_logo_img.png'
import MaterialTableContainer from '@mui/material/TableContainer'
import MaterialTable from '@mui/material/Table'
import MaterialTableBody from '@mui/material/TableBody'
import MaterialTypography from '@mui/material/Typography'
import MaterialContainer from '@mui/material/Container'
import MaterialGrid from '@mui/material/Grid'

const Index = () => {
    const { currentUser } = useContext( AppContext )
    const [ filter, setFilter ] = useState('')
    const [ isLoading, setIsLoading ] = useState('')
    const debouncedFilter = useDebounce(filter, 500)

    const {isLoading: isLoadingUser, data: userData } = useQuery(`${currentUser.details.username}`, apiClient(`${userListUrl}/${currentUser.details.username}`, currentUser.headers, null, 'GET'), {retry: false})
    const {isLoading: isLoadingProjects, data: projectsData } = useQuery('projectList', apiClient(projectListUrl, currentUser.headers, null, 'GET'), {retry: false})

    useEffect(() => {
        setIsLoading( isLoadingUser || isLoadingProjects )
        // eslint-disable-next-line
    }, [ isLoadingUser, isLoadingProjects ])

    const myProjectsData = userData?.relationships?.projects?.data
    const myProjects = projectsData?.filter(project => myProjectsData?.map(myProject => { return myProject.id }).includes(project.id))
    
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
                                My Projects
                            </MaterialTypography>
                        </TitleContainer>
                    </MaterialGrid>
                    <MaterialGrid item xs={12} sm={12} md={6}>
                        <TitleContainer sx = {{ height: '100%' }}>
                            <Search setFilter = { setFilter } label = 'Search Projects' />
                        </TitleContainer>
                    </MaterialGrid>
                </MaterialGrid>
            </TitleContainer>
            <MaterialContainer maxWidth = 'md'>
                    <MaterialTableContainer>
                        <MaterialTable>
                            <MaterialTableBody>
                            { myProjects && 
                                myProjects
                                .filter( project => debouncedFilter === '' || project?.attributes?.name?.toLowerCase().includes(debouncedFilter?.toLowerCase()) )
                                .map( project => {
                                    return <Project
                                                key = { project.id } 
                                                project = { project }
                                                projectListUrl = { projectListUrl }
                                                ticketListUrl = { ticketListUrl }
                                                userListUrl = { userListUrl }
                                                useQuery = { useQuery }
                                                apiClient = { apiClient }
                                                currentUser = { currentUser }
                                                setIsLoading = { setIsLoading }
                                                MaterialTypography = { MaterialTypography }
                                            />
                                }) 
                            }
                            </MaterialTableBody>
                        </MaterialTable>
                    </MaterialTableContainer>
            </MaterialContainer>
        </ColumnContainer>
    )
}

export default Index