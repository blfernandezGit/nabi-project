import { projectListUrl } from '../../../Helpers/constants'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../Context/AppContext'
import Project from './Project'
import { useQuery } from 'react-query'
import { apiClient } from '../../../Helpers/apiClient'
import { ColumnContainer, TitleContainer, LogoImg, HideTableCell, FormContainer } from '../../Layout/Elements'
import useDebounce from '../../../Helpers/useDebounce'
import MainLoading from '../../Layout/LoadingScreen/MainLoading'
import Search from '../../Layout/Search'
import ProjectCreate from './ProjectCreate'
import FloatingButton from '../../Layout/FloatingButton'
import nabi_logo_img from '../../../../assets/nabi_logo_img.png'
import MaterialTypography from '@mui/material/Typography'
import MaterialAddIcon from '@mui/icons-material/Add'
import MaterialModal from '@mui/material/Modal'
import MaterialGrid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import { dateFormatter } from '../../../Helpers/constants'

const Index = () => {
    const { currentUser, setIsLoading, title, setTitle } = useContext( AppContext )
    const [ filter, setFilter ] = useState('')
    const debouncedFilter = useDebounce(filter, 500)
    const [ open, setOpen ] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [sortModel, setSortModel] = useState([
        {
            field: 'Name',
            sort: 'asc',
        },
      ])
    const {isLoading: isLoadingProjects, data: projectData, refetch: getNewProjects } = useQuery('projectList', apiClient(projectListUrl, currentUser.headers, null, 'GET'), { retry: false })

    const columns = [
        { field: 'Name', flex: 1, minWidth: 150, },
        { field: 'Description', flex: 2, minWidth: 350 },
        { field: 'Tickets', type: 'number', flex: 0.2, minWidth: 80  },
        { field: 'Users', type: 'number', flex: 0.2, minWidth: 80 },
        { field: 'Created At', type: 'date', flex: 0.5, minWidth: 100  },
        { field: 'Updated At', type: 'date', flex: 0.5, minWidth: 100  },
    ]

    const rows = projectData?.map( project => {
            return {
                id: project.id,
                'Name': project.attributes.name,
                'Description': project.attributes.description,
                'Tickets': project.relationships?.tickets?.data?.length || 0,
                'Users': project.relationships?.users?.data?.length || 0,
                'Created At': dateFormatter.format(Date.parse(project.attributes?.created_at)),
                'Updated At': dateFormatter.format(Date.parse(project.attributes?.created_at))
            }
        })

    useEffect(() => {
        setIsLoading( isLoadingProjects )
        setTitle('All Projects')
        // eslint-disable-next-line
    }, [ isLoadingProjects ])

    
    return (
        <ColumnContainer maxWidth = 'xl'>
            <MainLoading isLoading = { isLoadingProjects } />
            <ColumnContainer>
            <div style={{ width: '100%' }}>
            {projectData && rows &&
                <DataGrid
                    rows = { rows }
                    columns = { columns }
                    sortModel={sortModel}
                    onSortModelChange={(model) => setSortModel(model)}
                    autoHeight
                    density = "comfortable"
                />
            }
            </div>
            </ColumnContainer>
            <MaterialModal
                open={open}
                onClose={handleClose}
                aria-labelledby="create-project-modal"
                aria-describedby="modal-for-creating-projects-in-admin-screen"
            >
                <FormContainer maxWidth="md" sx={{borderRadius: 2}}>
                    <ProjectCreate handleclose = { handleClose } getNewProjects = { getNewProjects }/>
                </FormContainer>
            </MaterialModal>
            <FloatingButton Icon= { MaterialAddIcon } func = {handleOpen}/>
        </ColumnContainer>
    )
}

export default Index