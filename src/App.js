import Layout from './components/MainApp/Layout'
import AppContextProvider from './components/Context/AppContext'

function App() {
  return (
    <>
      <AppContextProvider>
        <Layout/>
      </AppContextProvider>
    </>
  );
}

export default App;
