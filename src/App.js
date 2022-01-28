import Layout from './components/MainApp/Layout';
import AppContextProvider from './components/Context/AppContext';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <Layout/>
        </AppContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
