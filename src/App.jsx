import { Route, Routes } from 'react-router-dom';

import Header from './components/header/Header';
import Home from './components/Home';
import Loading from './components/loading/Loading';
import { UserContext, useStoreUserContext } from './store/context';


function App() {
  const storeUserContext = useStoreUserContext();

  return (
    <UserContext.Provider value={storeUserContext}>
      <Header/>
      <main>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      </main>
      {storeUserContext.isLoading && <Loading/>}
    </UserContext.Provider>
  );
}

export default App;
