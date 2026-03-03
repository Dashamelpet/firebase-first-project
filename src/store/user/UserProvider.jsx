import Preloader from '../../components/preloader/Preloader';
import { UserContext, useStoreUserContext } from './userContext';

export const UserProvider = ({ children }) => {
  const store = useStoreUserContext();
  // if(store.isGetUser === false) return <h1>Loading...</h1>

  return (
    <UserContext.Provider value={store}>
      {/* {store.isGetUser === false && <Preloader/>} */}

      <Preloader isGetUser={store.isGetUser} />
      {store.isGetUser === true && children}
    </UserContext.Provider>
  );
};
