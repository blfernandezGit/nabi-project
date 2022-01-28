import {useContext, useRef} from 'react';
import {AppContext} from '../../Context/AppContext';
import {postAPI} from '../../Helpers/postAPI';
import {loginUrl, loginAuditText} from '../../Helpers/constants';
import Cookies from 'js-cookie';


const useHooks = () => {
  const {setIsSignedIn, setCurrentUser, setIsLoading} = useContext( AppContext );
  const email = useRef();
  const password = useRef();

  const handleLogin = ( e ) => {
    e.preventDefault();
    const requestData = {
      email: email.current.value,
      password: password.current.value,
    };
    setIsLoading( true );
    // Call function from useAxiosPost.js - postAPI(url, requestData, headers, auditTrail, method)
    postAPI(loginUrl, requestData, null, loginAuditText, 'POST')
        .then( (data) => {
          setIsLoading( false );
          Cookies.set('user', true, {expires: 1});
          setCurrentUser( {details: data[0], headers: data[1]} );
          setIsSignedIn( true );
        })
        .catch((error) => {
          setIsLoading( false );
          // TODO: add error message handling
        });
  };

  return {
    handleLogin,
    email,
    password,
  };
};

export default useHooks;
