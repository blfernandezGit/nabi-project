import {Link} from 'react-router-dom';
import {projectListUrl} from '../../../../../Helpers/constants';
import useHooks from './hooks';
import MaterialDeleteIcon from '@mui/icons-material/Delete';
import MaterialChip from '@mui/material/Chip';
import MaterialTableCell from '@mui/material/TableCell';
import MaterialTableRow from '@mui/material/TableRow';
import MaterialIconButton from '@mui/material/IconButton';


const RelatedTicket = ({code, ticket_no, getNewRelatedTickets, relatedTicket, currentUser}) => {
  const {handleRemoveRelatedTicket} = useHooks( code, ticket_no );

  return (
    <MaterialTableRow>
      <MaterialTableCell scope='row'>
        <Link replace to={`/app/${currentUser?.details?.username}/${projectListUrl}/${code}/${relatedTicket?.ticket_no}`} style = {{textDecoration: 'none', color: 'black'}}>
              #{relatedTicket?.ticket_no}
        </Link>
      </MaterialTableCell>
      <MaterialTableCell>
        <Link replace to={`/app/${currentUser?.details?.username}/${projectListUrl}/${code}/${relatedTicket?.ticket_no}`} style = {{textDecoration: 'none', color: 'black'}}>
          {relatedTicket?.title}
        </Link>
      </MaterialTableCell>
      <MaterialTableCell scope="row">
        <MaterialChip
          size="small"
          label={relatedTicket?.status}
          variant="outlined"
        />
      </MaterialTableCell>
      <MaterialTableCell scope="row">
        <MaterialIconButton size = 'small' component = 'span' onClick = {(e) => handleRemoveRelatedTicket(e, getNewRelatedTickets, relatedTicket )}>
          <MaterialDeleteIcon />
        </MaterialIconButton>
      </MaterialTableCell>
    </MaterialTableRow>
  );
};

export default RelatedTicket;
