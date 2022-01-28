import {useContext, useRef} from 'react';
import {AppContext} from '../../../../Context/AppContext';
import {postAPI} from '../../../../Helpers/postAPI';
import {userListUrl, createUserAuditText} from '../../../../Helpers/constants';


const useHooks = () => {
  const {currentUser} = useContext( AppContext );
  const firstName = useRef();
  const lastName = useRef();
  const username = useRef();
  const email = useRef();
  const is_admin = useRef();
  const password = useRef();
  const passwordConfirmation = useRef();

  const handleCreateUser = ( e, handleclose, getNewUsers ) => {
    e.preventDefault();
    const requestData = {
      username: username.current.value,
      first_name: firstName.current.value,
      last_name: lastName.current.value,
      email: email.current.value,
      is_admin: is_admin.current.value,
      password: password.current.value,
      password_confirmation: passwordConfirmation.current.value,
    };
    // Call function from useAxiosPost.js - postAPI(url, requestData, headers, auditTrail, method)
    postAPI(userListUrl, requestData, currentUser.headers, createUserAuditText, 'POST')
        .then( (data) => {
          handleclose();
          getNewUsers();
        })
        .catch((error) => {
          // TODO: add error message handling
        });
  };

  return {
    handleCreateUser,
    username,
    firstName,
    lastName,
    email,
    is_admin,
    password,
    passwordConfirmation,
  };
};

export default useHooks;
