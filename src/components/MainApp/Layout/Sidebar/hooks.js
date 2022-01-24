import { useContext } from 'react'
import { AppContext } from '../../../Context/AppContext'
import { useQuery } from 'react-query'
import { apiClient } from '../../../Helpers/apiClient'
import { userListUrl, projectListUrl } from '../../../Helpers/constants'
import Cookies from 'js-cookie'

const useHooks = () => {
    const { currentUser, setCurrentUser, setIsSignedIn } = useContext( AppContext )
    
    const {isLoading: isLoadingUser, data: userData } = useQuery(`${currentUser.details.username}`, apiClient(`${userListUrl}/${currentUser.details.username}`, currentUser.headers, null, 'GET'), {retry: false})
    const {isLoading: isLoadingProjects, data: projectsData } = useQuery('projectList', apiClient(projectListUrl, currentUser.headers, null, 'GET'), {retry: false})

    const myProjectsData = userData?.relationships?.projects?.data
    const myProjects = projectsData?.filter(project => myProjectsData?.map(myProject => { return myProject.id }).includes(project.id))

    const handleLogout = () => {
        setIsSignedIn(false)
        Cookies.remove('user')
        setCurrentUser({})
    }

    const stringToColor = (string) => {
        let hash = 0
        let i;
    
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
    
        let color = '#';
    
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.substr(-2);
        }
        /* eslint-enable no-bitwise */
    
        return color;
    }
    
    const stringAvatar = (name) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return {
        myProjects,
        handleLogout,
        stringAvatar
    }
}

export default useHooks