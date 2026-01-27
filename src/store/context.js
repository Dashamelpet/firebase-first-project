import { useMemo } from 'react';
import { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export const useStoreUserContext = () => {
  const [user, setUser] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => setIsOpenModal(true)
  const closeModal = () => setIsOpenModal(false)
  
  const changeUser = (data) => setUser(data);

  const isLogin = useMemo(() => user ? true : false ,[user]);
  console.log(user)

  return {
    user,
    changeUser,
    isLogin,
    isOpenModal,
    openModal,
    closeModal
  };
};

export const useUserContext = () => useContext(UserContext);
