import {Link} from 'react-router-dom';
import {dateFormatter} from '../../Helpers/constants';
import {BorderLinearProgress} from './customComponents';
import MaterialTableCell from '@mui/material/TableCell';
import MaterialTableRow from '@mui/material/TableRow';
import MaterialBugReportIcon from '@mui/icons-material/BugReport';
import MaterialGrid from '@mui/material/Grid';

const Project = ({project, MaterialTypography}) => {
  const projectDetails = project?.attributes;

  const projectTickets = projectDetails.tickets;
  const projectTicketCount = projectTickets.length;
  const totalActionTickets = projectDetails.tickets.filter( (ticket) => ticket.status === 'Open' || ticket.status === 'ForFixing' || ticket.status === 'ForTesting').length;
  const percentTicketsClosed = projectTicketCount > 0 ? ( projectTicketCount - ( totalActionTickets )) * 100 / projectTicketCount : 0;
  const latestTicket = projectTickets[projectTicketCount - 1];

  const latestTicketSubmitDate = latestTicket && dateFormatter.format(Date.parse(latestTicket?.created_at));
  const latestTicketAuthor = latestTicket && latestTicket?.author;

  return (
    <MaterialTableRow>
      <MaterialTableCell>
        <MaterialGrid container>
          <MaterialGrid item xs={12} sm={12} md={5}>
            <Link to={`${projectDetails.code}`} style = {{textDecoration: 'none', color: 'black'}}>
              <MaterialTypography
                variant="h6">
                {projectDetails?.name}
              </MaterialTypography>
              <MaterialTypography
                variant="body2"
                sx={{pb: 4}}
              >
                {projectDetails?.description}
              </MaterialTypography>
            </Link>
          </MaterialGrid>
          <MaterialGrid item xs={12} sm={6} md={2} sx={{textAlign: 'center'}}>
            <MaterialBugReportIcon/>
            <MaterialTypography
              variant="body1">
              { totalActionTickets ? totalActionTickets : 0 } { totalActionTickets === 1 ? <span>bug</span> : <span>bugs</span> } need action
            </MaterialTypography>
            <BorderLinearProgress sx={{pb: 0.75, mt: 1}} variant = "determinate" value = { percentTicketsClosed ? percentTicketsClosed : 0 } ></BorderLinearProgress>
            <MaterialTypography
              variant="body1">
                            out of { projectTicketCount ? projectTicketCount : 0 } { projectTicketCount === 1 ? <span>bug</span> : <span>total bugs</span> }
            </MaterialTypography>
          </MaterialGrid>
          <MaterialGrid item xs={12} sm={6} md={5} sx={{textAlign: 'center'}}>
            {latestTicket &&
                            <Link to={`${projectDetails.code}/${latestTicket?.ticket_no}`} style = {{textDecoration: 'none', color: 'black'}}>
                              <MaterialTypography
                                variant="body2">
                                { latestTicketAuthor } on { latestTicketSubmitDate }:
                              </MaterialTypography>
                              <MaterialTypography
                                variant="subtitle1">
                                <q>{ latestTicket?.title }</q>
                              </MaterialTypography>
                            </Link>
            }
          </MaterialGrid>
        </MaterialGrid>
      </MaterialTableCell>
    </MaterialTableRow>
  );
};

export default Project;

