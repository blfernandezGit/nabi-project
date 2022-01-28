import {useContext} from 'react';
import {AppContext} from '../../../../../Context/AppContext';
import {postAPI} from '../../../../../Helpers/postAPI';
import {projectListUrl, ticketListUrl, createTicketAuditText, addRelatedTicketUrl} from '../../../../../Helpers/constants';


const useHooks = ( code, ticket_no ) => {
  const {currentUser} = useContext( AppContext );

  const handleAddRelatedTicket = ( e, handleclose, getUpdatedTicket, selectedTicket ) => {
    e.preventDefault();
    const requestData = {
      related_ticket_id: selectedTicket?.id,
    };
    // Call function from useAxiosPost.js - postAPI(url, requestData, headers, auditTrail, method)
    postAPI(`${projectListUrl}/${code}/${ticketListUrl}/${ticket_no}/${addRelatedTicketUrl}`, requestData, currentUser.headers, createTicketAuditText, 'POST')
        .then( (data) => {
          handleclose();
          getUpdatedTicket();
        })
        .catch((error) => {
          // TODO: add error message handling
        });
  };

  return {
    handleAddRelatedTicket,
  };
};

export default useHooks;
