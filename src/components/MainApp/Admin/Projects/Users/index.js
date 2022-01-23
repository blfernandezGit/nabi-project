import { projectListUrl, userListUrl } from '../../../../Helpers/constants'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../../../Context/AppContext'
import User from './User'
import AddProjectUsers from './AddProjectUsers'
import { useQuery } from 'react-query'
import { apiClient } from '../../../../Helpers/apiClient'
import { ColumnContainer, TitleContainer, LogoImg, HideTableCell, FormContainer } from '../../../Layout/Elements'
import useDebounce from '../../../../Helpers/useDebounce'
import MainLoading from '../../../LoadingScreen/MainLoading'
import Search from '../../../Search'
import FloatingButton from '../../../FloatingButton'
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
    const { project_code } = useParams()
    const { currentUser, setIsLoading} = useContext( AppContext )
    const [ filter, setFilter ] = useState('')
    const debouncedFilter = useDebounce(filter, 500)
    const [ open, setOpen ] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const {isLoading: isLoadingProject, data: projectData, refetch: getNewUsers  } = useQuery(`${project_code}`, apiClient(`${projectListUrl}/${project_code}`, currentUser.headers, null, 'GET'), { retry: false })
    const {isLoading: isLoadingUsers, data: usersData } = useQuery('userList', apiClient(userListUrl, currentUser.headers, null, 'GET'), { retry: false })

    
    useEffect(() => {
        setIsLoading( isLoadingProject || isLoadingUsers )
        // eslint-disable-next-line
    }, [ isLoadingProject, isLoadingUsers ])

    const projectUsersData = projectData?.relationships?.users?.data
    const projectUsers = usersData?.filter(user => projectUsersData?.map(projectUser => { return projectUser.id }).includes(user.id))
    
    return (
        <ColumnContainer maxWidth = 'xl'>
            <MainLoading isLoading = { isLoadingUsers } />
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
                        <TitleContainer sx = {{ height: '100%' }}>
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
                                        # Tickets
                                    </HideTableCell>
                                    <MaterialTableCell>
                                        # Projects
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
                            { projectUsers && 
                                projectUsers
                                .filter( user => debouncedFilter === '' || user?.attributes?.username?.toLowerCase().includes(debouncedFilter?.toLowerCase()) )
                                .map( user => {
                                    return <User
                                                key = { user.id } 
                                                user = { user }
                                                projectUsers = { projectUsers }
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
                    <AddProjectUsers 
                        handleclose = { handleClose }
                        getNewProjects = { getNewUsers }
                        usersData = { usersData }
                        projectUsers = { projectUsers }
                        projectData = { projectData }
                    />
                </FormContainer>
            </MaterialModal>
            { usersData && projectUsersData && (projectUsersData.length !== usersData.length) &&
                <FloatingButton Icon= { MaterialAddIcon } func = {handleOpen}/>
            }
        </ColumnContainer>
    )
}

export default Index