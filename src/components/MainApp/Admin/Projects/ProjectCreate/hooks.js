import {useContext, useRef} from 'react';
import {AppContext} from '../../../../Context/AppContext';
import {postAPI} from '../../../../Helpers/postAPI';
import {projectListUrl, createProjectAuditText} from '../../../../Helpers/constants';


const useHooks = () => {
  const {currentUser} = useContext( AppContext );
  const name = useRef();
  const description = useRef();

  const handleCreateProject = ( e, handleclose, getNewProjects ) => {
    e.preventDefault();
    const requestData = {
      name: name.current.value,
      description: description.current.value,
    };
    // Call function from useAxiosPost.js - postAPI(url, requestData, headers, auditTrail, method)
    postAPI(projectListUrl, requestData, currentUser.headers, createProjectAuditText, 'POST')
        .then( (data) => {
          handleclose();
          getNewProjects();
        })
        .catch((error) => {
          // TODO: add error message handling
        });
  };

  return {
    handleCreateProject,
    name,
    description,
  };
};

export default useHooks;
