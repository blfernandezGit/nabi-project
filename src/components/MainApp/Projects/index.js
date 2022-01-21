import { userListUrl, projectListUrl, ticketListUrl } from '../../Helpers/constants'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import Project from './Project'
import { useQuery } from 'react-query'
import { apiClient } from '../../Helpers/apiClient'
import { Button, ColumnContainer, Link, Logo } from '../Layout/Elements'
import List from '@mui/material/List'
import TableContainer from '@mui/material/TableContainer'
import { ProjectContainer } from './customComponents'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

const Index = () => {
    const { currentUser, setIsLoading} = useContext( AppContext )
    const [ errorMessage, setErrorMessage ] = useState('')

    const {isLoading: isLoadingUser, error: userError, data: userData, refetch: getUserData } = useQuery('currentUserData', apiClient(`${userListUrl}/${currentUser.details.username}`, currentUser.headers, null, 'GET'))
    const {isLoading: isLoadingProjects, error: projectsError, data: projectsData, refetch: getProjectsData } = useQuery('projectList', apiClient(projectListUrl, currentUser.headers, null, 'GET'))

    useEffect(() => {
        setIsLoading( isLoadingUser || isLoadingProjects )
        // eslint-disable-next-line
    }, [ isLoadingUser, isLoadingProjects ])

    const myProjectsData = userData?.relationships?.projects?.data
    const myProjects = projectsData?.filter(project => myProjectsData?.map(myProject => { return myProject.id }).includes(project.id))
    
    return (
        <ColumnContainer maxWidth='xl'>
            My Projects
            <ProjectContainer maxWidth='md'>
                    <TableContainer>
                        <Table>
                            <TableBody>
                            { myProjects && 
                                myProjects
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
                                            />
                                }) 
                            }
                            </TableBody>
                        </Table>
                    </TableContainer>
            </ProjectContainer>
        </ColumnContainer>
    )
}

export default Index