import { userListUrl } from '../../../Helpers/constants'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../Context/AppContext'
import User from './User'
import { useQuery } from 'react-query'
import { apiClient } from '../../../Helpers/apiClient'

const Index = () => {
    const { currentUser, setIsLoading} = useContext( AppContext )
    const [ errorMessage, setErrorMessage ] = useState('')

    const {isLoading, error, data, refetch } = useQuery('userList', apiClient(userListUrl, currentUser.headers, null, 'GET'))

    useEffect(() => {
        setIsLoading( isLoading )
        // eslint-disable-next-line
    }, [ isLoading ])
    
    return (
        <div>
            UserList
            { data && 
                data
                .map( user => {
                    return <User
                                key={user.id} 
                                user = {user}
                            />
                }) 
            }
        </div>
    )
}

export default Index