import { projectListUrl } from '../../../Helpers/constants'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../Context/AppContext'
import Project from './Project'
import { useQuery } from 'react-query'
import { apiClient } from '../../../Helpers/apiClient'
import { ColumnContainer, TitleContainer, LogoImg, HideTableCell, FormContainer } from '../../Layout/Elements'
import useDebounce from '../../../Helpers/useDebounce'
import MainLoading from '../../Layout/LoadingScreen/MainLoading'
import Dialog from '../../Layout/Dialog'
import Search from '../../Layout/Search'
import ProjectCreate from './ProjectCreate'
import FloatingButton from '../../Layout/FloatingButton'
import nabi_logo_img from '../../../../assets/nabi_logo_img.png'
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
    const { currentUser, setIsLoading, title, setTitle } = useContext( AppContext )
    const [ filter, setFilter ] = useState('')
    const debouncedFilter = useDebounce(filter, 500)
    const [ open, setOpen ] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const {isLoading: isLoadingProjects, data: projectData, refetch: getNewProjects } = useQuery('projects', apiClient(projectListUrl, currentUser.headers, null, 'GET'), { retry: false })

    useEffect(() => {
        setIsLoading( isLoadingProjects )
        setTitle('All Projects')
        // eslint-disable-next-line
    }, [ isLoadingProjects ])
    
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
                                All Projects
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
            <ColumnContainer>
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
                                        Tickets
                                    </HideTableCell>
                                    <MaterialTableCell>
                                        Members
                                    </MaterialTableCell>
                                    <HideTableCell>
                                        Created At
                                    </HideTableCell>
                                    <HideTableCell>
                                        Updated At
                                    </HideTableCell>
                                    <MaterialTableCell/>
                                    <MaterialTableCell/>
                                </MaterialTableRow>
                            </MaterialTableHeader>
                            <MaterialTableBody>
                            { projectData && 
                                projectData
                                .filter( project => {return ['name', 'description'].some(key => project?.attributes[key].toLowerCase().includes(debouncedFilter.toLowerCase()))})
                                .map( project => {
                                    return <Project
                                                key = { project.id } 
                                                project = { project }
                                                HideTableCell = { HideTableCell }
                                                MaterialTableCell = { MaterialTableCell }
                                                MaterialTableRow = { MaterialTableRow }
                                                MaterialTypography = { MaterialTypography }
                                                FormContainer = { FormContainer }
                                                getNewProjects = { getNewProjects }
                                            />
                                }) 
                            }
                            </MaterialTableBody> 
                        </MaterialTable>
                    </MaterialTableContainer>
            </ColumnContainer>
            <Dialog
                open={open}
                setOpen={setOpen}
                maxWidth = 'md'
                title='Create Project'
            >
                <ProjectCreate handleclose = { handleClose } getNewProjects = { getNewProjects }/>
            </Dialog>
            <FloatingButton Icon= { MaterialAddIcon } func = {handleOpen}/>
        </ColumnContainer>
    )
}

export default Index