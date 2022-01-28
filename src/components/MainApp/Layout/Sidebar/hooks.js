import Cookies from 'js-cookie';
import {useContext} from 'react';
import {useQuery} from 'react-query';
import {AppContext} from '../../../Context/AppContext';
import {apiClient} from '../../../Helpers/apiClient';
import {currentUserProjectsUrl} from '../../../Helpers/constants';

const useHooks = () => {
  const {currentUser, setCurrentUser, setIsSignedIn} = useContext( AppContext );

  const {data: currentUserProjectsData} = useQuery(`${currentUser?.details?.username}_projects`, apiClient(currentUserProjectsUrl, currentUser.headers, null, 'GET'), {retry: false});

  const handleLogout = () => {
    setIsSignedIn(false);
    Cookies.remove('user');
    setCurrentUser({});
  };

  const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  };

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  };

  return {
    currentUserProjectsData,
    handleLogout,
    stringAvatar,
  };
};

export default useHooks;
