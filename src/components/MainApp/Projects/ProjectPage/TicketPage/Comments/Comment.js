import { dateFormatter, userListUrl } from '../../../../../Helpers/constants'
import { Paper, Avatar } from './customComponents'
import { TitleContainer } from '../../../../Layout/Elements'
import useHooks from '../hooks'
import MaterialTypography from '@mui/material/Typography'


const Comment = ({ comment, apiClient, useQuery, currentUser }) => {
    const commentDetails = comment?.attributes
    const {  stringAvatar } = useHooks()

    const {isLoading: isLoadingUsers, data: usersData, refetch: getUsersData } = useQuery('userList', apiClient(`${userListUrl}`, currentUser.headers, null, 'GET'), {retry: false, enabled:false})
    const author = usersData && commentDetails?.user_id && usersData.filter(author => author?.id === commentDetails?.user_id )[0]?.attributes

    return (
        <Paper sx = {{ my: 2, py: 2 }}>
            <TitleContainer sx = {{ m: 1 }}>
                {author &&
                    <>
                        <Avatar {...stringAvatar(`${author?.first_name} ${author?.last_name}`)}/>
                        <MaterialTypography
                            variant = "h7"
                            sx = {{ m: 1 }}>
                            {author?.username}
                        </MaterialTypography>
                    </>
                }
            </TitleContainer>
            <MaterialTypography
                variant = "body1"
                sx = {{ m: 2 }}>
                { commentDetails?.comment_text }
            </MaterialTypography>
        </Paper>
    );
};

export default Comment