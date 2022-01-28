import {createContext, useState} from 'react';
import useSessionStorage from '../Helpers/useSessionStorage';
import useLocalStorage from '../Helpers/useLocalStorage';
export const AppContext = createContext();

const AppContextProvider = ( props ) => {
  const [isSignedIn, setIsSignedIn] = useSessionStorage( 'isSignedIn', '' );
  const [currentUser, setCurrentUser] = useLocalStorage( 'currentUser', '' );
  const [isLoading, setIsLoading] = useState( false );
  const [filter, setFilter] = useState();
  const [label, setLabel] = useState('Search');
  const [showSearch, setShowSearch] = useState(true);
  const [title, setTitle] = useState('Nabi Project');
  const state = {isSignedIn, currentUser, isLoading, title, filter, label, showSearch};
  const setState = {setIsSignedIn, setCurrentUser, setIsLoading, setTitle, setFilter, setLabel, setShowSearch};

  return (
    <AppContext.Provider value={{...state, ...setState}}>
      { props.children }
    </AppContext.Provider>
  );
};

export default AppContextProvider;
