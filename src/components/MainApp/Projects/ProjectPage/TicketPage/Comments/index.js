import Comment from './Comment';
import MaterialContainer from '@mui/material/Container';

const Index = ({code, ticket_no, comments, currentUser, getUpdatedTicket}) => {
  return (
    <>
      <MaterialContainer maxWidth = 'md'>
        { comments &&
                comments
                    .map( (comment) => {
                      return <Comment
                        key = { comment.id }
                        code = { code }
                        ticket_no = { ticket_no }
                        comment = { comment }
                        getNewComments = { getUpdatedTicket }
                        currentUser = { currentUser }
                      />;
                    })
        }
      </MaterialContainer>
    </>
  );
};

export default Index;
