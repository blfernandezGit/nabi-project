import { LoadingContainer } from '../../Elements'
import CircularProgress from '@mui/material/CircularProgress'

const Index = ({ isLoading }) => {
    return (
        <>
            { isLoading &&
                <LoadingContainer maxWidth = 'md'>
                <CircularProgress color = 'secondary'/>
                </LoadingContainer>
            }
        </>
    );
};

export default Index;
