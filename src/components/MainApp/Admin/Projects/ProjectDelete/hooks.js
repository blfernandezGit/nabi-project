import {useContext, useRef} from 'react';
import {AppContext} from '../../../../Context/AppContext';
import {postAPI} from '../../../../Helpers/postAPI';
import {projectListUrl, deleteProjectAuditText} from '../../../../Helpers/constants';

const useHooks = ( code, projectName ) => {
  const {currentUser} = useContext( AppContext );
  const name = useRef();

  const handleDeleteProject = ( e, handleclose, getNewProjects ) => {
    e.preventDefault();
    // Call function from useAxiosPost.js - postAPI(url, requestData, headers, auditTrail, method)
    if ( name.current.value === projectName ) {
      postAPI(`${projectListUrl}/${code}`, null, currentUser.headers, deleteProjectAuditText, 'DELETE')
          .then( (data) => {
            handleclose();
            getNewProjects();
          })
          .catch((error) => {
            // TODO: add error message handling
          });
    } else {
      console.log('Wrong Project Name');
    }
  };

  return {
    handleDeleteProject,
    name,
  };
};

export default useHooks;
