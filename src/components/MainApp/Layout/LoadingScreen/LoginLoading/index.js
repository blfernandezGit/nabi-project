import {LoadingContainer} from '../../Elements';
import CircularProgress from '@mui/material/CircularProgress';

const Index = () => {
  return (
    <>
      <LoadingContainer maxWidth = 'xl' style={{position: 'fixed'}}>
        <CircularProgress color = 'secondary'/>
      </LoadingContainer>
    </>
  );
};

export default Index;
