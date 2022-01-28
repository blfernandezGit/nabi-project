import {useContext, useEffect, useState} from 'react';
import {Formik} from 'formik';
import useHooks from './hooks';
import {useQuery} from 'react-query';
import {apiClient} from '../../../../../Helpers/apiClient';
import {AppContext} from '../../../../../Context/AppContext';
import {projectListUrl, ticketListUrl} from '../../../../../Helpers/constants';
import MainLoading from '../../../../Layout/LoadingScreen/MainLoading';
import MaterialTextField from '@mui/material/TextField';
import MaterialAutocomplete from '@mui/material/Autocomplete';
import MaterialButton from '@mui/material/Button';
import MaterialDialogActions from '@mui/material/DialogActions';


const Index = ({code, ticket_no, handleclose, getUpdatedTicket, ticketData}) => {
  const {handleAddRelatedTicket} = useHooks(code, ticket_no);

  const {currentUser} = useContext( AppContext );
  const [projectTickets, setProjectTickets] = useState();
  const [selectedTicket, setSelectedTicket] = useState(null);

  const {isLoading: isLoadingProjectTickets, data: projectTicketsData} = useQuery( `${ code }_tickets`, apiClient(`${projectListUrl}/${code}/${ticketListUrl}`, currentUser.headers, null, 'GET' ), {retry: false});

  useEffect(() => {
    setProjectTickets(
        projectTicketsData &&
            projectTicketsData
                .filter((ticket) => ticket?.id !== ticketData?.id)
                .filter((ticket) => !ticketData?.attributes?.related_tickets?.map((relatedTicket) => {
                  return relatedTicket?.id;
                }).includes(ticket?.id))
                .filter((ticket) => !ticketData?.attributes?.inverse_related_tickets?.map((inverseRelatedTicket) => {
                  return inverseRelatedTicket?.id;
                }).includes(ticket?.id))
                .map( (ticket) => {
                  return ({
                    label: '#' + ticket?.attributes?.ticket_no + ' - ' + ticket?.attributes?.title,
                    id: ticket?.id,
                  });
                }),
    );
    // eslint-disable-next-line
    }, [projectTicketsData])


  return (
    <>
      <MainLoading isLoading = { isLoadingProjectTickets } />
      <Formik>
        {({
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit = { handleSubmit } style={{paddingTop: '8px'}}>
            {projectTicketsData && projectTickets &&
                        <MaterialAutocomplete
                          value = { selectedTicket }
                          name = 'relatedTickets'
                          options={ projectTickets }
                          onChange={ (e, value) =>
                            setSelectedTicket(value)
                          }
                          isOptionEqualToValue={(option, value) => option?.id === value?.id}
                          sx={{mb: 2}}
                          renderInput={(params) => (
                            <MaterialTextField
                              {...params}
                              label="Related Tickets"
                              name = 'relatedTickets'
                              fullWidth
                            />
                          )}
                        />
            }
            <MaterialDialogActions>
              <MaterialButton autoFocus onClick={handleclose}>
                            Cancel
              </MaterialButton>
              <MaterialButton
                type = "submit"
                onClick={( e ) => handleAddRelatedTicket( e, handleclose, getUpdatedTicket, selectedTicket )}
                disabled = { isSubmitting }
                autoFocus
              >
                            Add Related Ticket
              </MaterialButton>
            </MaterialDialogActions>
          </form>
        )}
      </Formik>
      <MainLoading/>
    </>
  );
};

export default Index;
