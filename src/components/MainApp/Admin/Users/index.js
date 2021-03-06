import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../Context/AppContext'
import { useQuery } from 'react-query'
import { apiClient } from '../../../Helpers/apiClient'
import { userListUrl } from '../../../Helpers/constants'
import User from './User'
import { ColumnContainer, TitleContainer, LogoImg, HideTableCell, FormContainer } from '../../Layout/Elements'
import useDebounce from '../../../Helpers/useDebounce'
import MainLoading from '../../Layout/LoadingScreen/MainLoading'
import Search from '../../Layout/Search'
import UserCreate from './UserCreate'
import Dialog from '../../Layout/Dialog'
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

    const {isLoading: isLoadingUsers, data: userData, refetch: getNewUsers } = useQuery('users', apiClient(userListUrl, currentUser.headers, null, 'GET'), { retry: false })

    useEffect(() => {
        setIsLoading( isLoadingUsers )
        setTitle('All Users')
        // eslint-disable-next-line
    }, [ isLoadingUsers ])
    
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
                                { title }
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
            <ColumnContainer>
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
                                        Tickets
                                    </HideTableCell>
                                    <HideTableCell>
                                        Projects
                                    </HideTableCell>
                                    <MaterialTableCell>
                                        Admin
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
                            { userData && 
                                userData
                                .filter( user => {return ['username', 'first_name', 'last_name', 'email'].some(key => user?.attributes[key].toLowerCase().includes(debouncedFilter.toLowerCase()))})
                                .map( user => {
                                    return <User
                                                key = { user.id } 
                                                user = { user }
                                                userData = { userData }
                                                HideTableCell = { HideTableCell }
                                                MaterialTableCell = { MaterialTableCell }
                                                MaterialTableRow = { MaterialTableRow }
                                                MaterialTypography = { MaterialTypography }
                                                FormContainer = { FormContainer }
                                                getNewUsers = { getNewUsers }
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
                title='Add User'
            >
                <UserCreate handleclose = { handleClose } getNewUsers = { getNewUsers }/>
            </Dialog>
            <FloatingButton Icon= { MaterialAddIcon } func = {handleOpen}/>
        </ColumnContainer>
    )
}

export default Index