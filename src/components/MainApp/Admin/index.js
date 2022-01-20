import { userListUrl } from '../../Helpers/constants'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import User from '../Users/User'
import { useQuery } from 'react-query'
import { apiClient } from '../../Helpers/apiClient'

const Index = () => {
    const { currentUser, setIsLoading} = useContext( AppContext )
    const [ errorMessage, setErrorMessage ] = useState('')

    const {isLoading: isLoadingUsers, error, data: users, refetch: getAllUsers } = useQuery('userList', apiClient(userListUrl, currentUser.headers, null, 'GET'))

    useEffect(() => {
        setIsLoading( isLoadingUsers )
        // eslint-disable-next-line
    }, [ isLoadingUsers ])
    
    return (
        <div>
            AdminHome
        </div>
    )
}

export default Index
