import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { signOutUser } from '../../firebase/auth';
import { useUserContext } from '../../store/context';
import LogInModal from '../modal/LogInModal';

import './style.scss';

const Header = () => {
  const { isLogin, isOpenModal, openModal, closeModal, changeUser } = useUserContext();

  const handleBtnLogIn = () => {
    if (isLogin) {
      closeModal();
      signOutUser();
      changeUser(null);
    } else openModal();
  };
  return (
    <header>
      <nav className="nav-list">
        <NavLink className={(arg) => (arg.isActive ? 'active' : '')} to="/">
          Home
        </NavLink>
        
      </nav>
      <button onClick={handleBtnLogIn}>{isLogin ? 'Выйти' : 'Войти'}</button>
      {isOpenModal && <LogInModal />}
    </header>
  );
};

export default Header;
