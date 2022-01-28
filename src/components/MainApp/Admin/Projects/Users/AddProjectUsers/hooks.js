import {useContext} from 'react';
import {AppContext} from '../../../../../Context/AppContext';
import {postAPI} from '../../../../../Helpers/postAPI';
import {updateProjectUsersUrl} from '../../../../../Helpers/constants';


const useHooks = ( projectData ) => {
  const {currentUser} = useContext( AppContext );

  const handleAddProjectUsers = ( e, handleclose, getNewUsers, selectedUsers ) => {
    e.preventDefault();
    const requestData = {
      project_id: projectData.id,
      user_ids: selectedUsers ? JSON.stringify(selectedUsers) : [],
    };
    // Call function from useAxiosPost.js - postAPI(url, requestData, headers, auditTrail, method)
    postAPI(updateProjectUsersUrl, requestData, currentUser.headers, null, 'POST')
        .then( (data) => {
          handleclose();
          getNewUsers();
        })
        .catch((error) => {
          // TODO: add error message handling
        });
  };

  return {
    handleAddProjectUsers,
  };
};

export default useHooks;
