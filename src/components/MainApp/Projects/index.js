import { projectListUrl } from '../../Helpers/constants'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import Project from './Project'
import { useQuery } from 'react-query'
import { apiClient } from '../../Helpers/apiClient'

const Index = () => {
    const { currentUser, setIsLoading} = useContext( AppContext )
    const [ errorMessage, setErrorMessage ] = useState('')

    const {isLoading, error, data, refetch } = useQuery('projectList', apiClient(projectListUrl, currentUser.headers, null, 'GET'))

    useEffect(() => {
        setIsLoading( isLoading )
        // eslint-disable-next-line
    }, [ isLoading ])
    
    return (
        <div>
            ProjectList
            { data && 
                data
                .map( project => {
                    return <Project
                                key={project.id} 
                                project = {project}
                            />
                }) 
            }
        </div>
    )
}

export default Index