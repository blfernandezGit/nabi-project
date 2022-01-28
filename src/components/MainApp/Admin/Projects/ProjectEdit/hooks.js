import {useContext, useRef} from 'react';
import {AppContext} from '../../../../Context/AppContext';
import {postAPI} from '../../../../Helpers/postAPI';
import {projectListUrl, updateProjectAuditText} from '../../../../Helpers/constants';

const useHooks = ( code ) => {
  const {currentUser} = useContext( AppContext );
  const name = useRef();
  const description = useRef();

  const handleEditProject = ( e, handleclose, getNewProjects ) => {
    e.preventDefault();
    const requestData = {
      name: name.current.value,
      description: description.current.value,
    };
    // Call function from useAxiosPost.js - postAPI(url, requestData, headers, auditTrail, method)
    postAPI(`${projectListUrl}/${code}`, requestData, currentUser.headers, updateProjectAuditText, 'PATCH')
        .then( (data) => {
          handleclose();
          getNewProjects();
        })
        .catch((error) => {
          // TODO: add error message handling
        });
  };

  return {
    handleEditProject,
    name,
    description,
  };
};

export default useHooks;
