import { useMemo } from 'react';
import { createContext, useContext, useState } from 'react';
import { createUserAuth, loginUserApi, signOutUser } from '../firebase/auth';

export const UserContext = createContext();

export const useStoreUserContext = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSignOut = () => {
    setIsLoading(true);
    signOutUser();
    setIsLoading(false);
    setUser(null);
  };
  const onCreateUser = async (email, password) => {
    setIsLoading(true);
    const res = await createUserAuth(email, password);
    setIsLoading(false);
    if (res.ok) {
      setUser(res.data.email);
      return { ok: true, code: null };
    } else {
      return { ok: false, code: res.code };
    }
  };
  const onSignUser =  async (email, password) => {
  setIsLoading(true);
  const res = await loginUserApi(email, password);
  setIsLoading(false);
  if (res.ok) {
    setUser(res.data.email);
    return { ok: true, code: null };
  } else {
    return { ok: false, code: res.code };
  }
}

  const isLogin = useMemo(() => (user ? true : false), [user]);
  console.log(user);

  return {
    user,
    isLogin,
    isLoading,

    onSignOut,
    onCreateUser,
    onSignUser,
  };
};

export const useUserContext = () => useContext(UserContext);
