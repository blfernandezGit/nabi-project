import { projectListUrl, userListUrl } from '../../../../Helpers/constants'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../../../Context/AppContext'
import Project from './Project'
import AddUserProjects from './AddUserProjects'
import { useQuery } from 'react-query'
import { apiClient } from '../../../../Helpers/apiClient'
import { ColumnContainer, TitleContainer, LogoImg, HideTableCell, FormContainer } from '../../../Layout/Elements'
import useDebounce from '../../../../Helpers/useDebounce'
import MainLoading from '../../../Layout/LoadingScreen/MainLoading'
import Search from '../../../Layout/Search'
import FloatingButton from '../../../Layout/FloatingButton'
import nabi_logo_img from '../../../../../assets/nabi_logo_img.png'
import MaterialTableContainer from '@mui/material/TableContainer'
import MaterialTable from '@mui/material/Table'
import MaterialTableBody from '@mui/material/TableBody'
import MaterialTableHeader from '@mui/material/TableHead'
import MaterialTableRow from '@mui/material/TableRow'
import MaterialTableCell from '@mui/material/TableCell'
import MaterialTypography from '@mui/material/Typography'
import MaterialContainer from '@mui/material/Container'
import MaterialAddIcon from '@mui/icons-material/Add'
import MaterialModal from '@mui/material/Modal'
import MaterialGrid from '@mui/material/Grid'

const Index = () => {
    const { user_username } = useParams()
    const { currentUser, setIsLoading, title, setTitle } = useContext( AppContext )
    const [ filter, setFilter ] = useState('')
    const debouncedFilter = useDebounce(filter, 500)
    const [ open, setOpen ] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const {isLoading: isLoadingUser, data: userData, refetch: getNewProjects  } = useQuery(`${user_username}`, apiClient(`${userListUrl}/${user_username}`, currentUser.headers, null, 'GET'), { retry: false })
    const {isLoading: isLoadingProjects, data: projectsData } = useQuery('projectList', apiClient(projectListUrl, currentUser.headers, null, 'GET'), { retry: false })

    
    useEffect(() => {
        setIsLoading( isLoadingUser || isLoadingProjects )
        setTitle(`${user_username}'s Projects`)
        // eslint-disable-next-line
    }, [ isLoadingUser, isLoadingProjects ])

    const userProjectsData = userData?.relationships?.projects?.data
    const userProjects = projectsData?.filter(project => userProjectsData?.map(userProject => { return userProject.id }).includes(project.id))
    
    return (
        <ColumnContainer maxWidth = 'xl'>
            <MainLoading isLoading = { isLoadingProjects } />
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
                                Projects of { user_username }
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
            <MaterialContainer maxWidth = 'l'>
                    <MaterialTableContainer>
                        <MaterialTable>
                            <MaterialTableHeader>
                                <MaterialTableRow>
                                    <MaterialTableCell>
                                        Name
                                    </MaterialTableCell>
                                    <HideTableCell>
                                        Description
                                    </HideTableCell>
                                    <HideTableCell>
                                        # Tickets
                                    </HideTableCell>
                                    <MaterialTableCell>
                                        # Members
                                    </MaterialTableCell>
                                    <HideTableCell>
                                        Created At
                                    </HideTableCell>
                                    <HideTableCell>
                                        Updated At
                                    </HideTableCell>
                                </MaterialTableRow>
                            </MaterialTableHeader>
                            <MaterialTableBody>
                            { userProjects && 
                                userProjects
                                .filter( project => debouncedFilter === '' || project?.attributes?.name?.toLowerCase().includes(debouncedFilter?.toLowerCase()) )
                                .map( project => {
                                    return <Project
                                                key = { project.id } 
                                                project = { project }
                                                userProjects = { userProjects }
                                                HideTableCell = { HideTableCell }
                                                MaterialTableCell = { MaterialTableCell }
                                                MaterialTableRow = { MaterialTableRow }
                                                MaterialTypography = { MaterialTypography }
                                                FormContainer = { FormContainer }
                                            />
                                }) 
                            }
                            </MaterialTableBody> 
                        </MaterialTable>
                    </MaterialTableContainer>
            </MaterialContainer>
            <MaterialModal
                open={open}
                onClose={handleClose}
                aria-labelledby="create-project-modal"
                aria-describedby="modal-for-creating-projects-in-admin-screen"
            >
                <FormContainer maxWidth="md" sx={{borderRadius: 2}}>
                    <AddUserProjects 
                        handleclose = { handleClose }
                        getNewProjects = { getNewProjects }
                        projectsData = { projectsData }
                        userProjects = { userProjects }
                        userData = { userData }
                    />
                </FormContainer>
            </MaterialModal>
            { projectsData && userProjectsData && (userProjectsData.length !== projectsData.length) &&
                <FloatingButton Icon= { MaterialAddIcon } func = {handleOpen}/>
            }
        </ColumnContainer>
    )
}

export default Index