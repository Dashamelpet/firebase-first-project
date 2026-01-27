import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/header/Header';
import Home from './components/Home';
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
    </UserContext.Provider>
  );
}

export default App;
