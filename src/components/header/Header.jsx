import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getTextErrorModal } from '../../firebase/helper.api';
import { useUserContext } from '../../store/context';
import LogInModal from '../modal/LogInModal';

import './style.scss';
const buttons = {
 login : { type: 'login', text: 'Войти' },
 regist : { type: 'registation', text: 'Регистрация' },
}

const Header = () => {
  const [isOpenModal, setIsopenModal] = useState(false);
  const [typeModal, setTypeModal] = useState(null);
  const { isLogin, onCreateUser, onSignOut, onSignUser} = useUserContext();

  const closeModal = () => {
    setIsopenModal(false);
  };

  const handleBtnSignIn = () => {
    setIsopenModal(true);
    setTypeModal('signIn')
  };
  const handleBtnRegist = () => {
    setIsopenModal(true);
    setTypeModal('regist')
  };
  
  const onAuth = async (email, password) => {
    console.log(typeModal, 'email', email, 'password', password)
    const success = typeModal === 'regist' ? await onCreateUser(email, password) : await onSignUser(email,password);
    if (success.ok) closeModal();
    return success.code;
  }

  return (
    <header>
      <nav className="nav-list">
        <NavLink className={(arg) => (arg.isActive ? 'active' : '')} to="/">
          Home
        </NavLink>
      </nav>
      {isLogin ? (
        <button onClick={onSignOut}>Выйти</button>
      ) : (
        <div className='btn-auth'>
          <button onClick={handleBtnRegist}>Регистрация</button>
          <button onClick={handleBtnSignIn}>Войти</button>
        </div>
      )}
      {isOpenModal && <LogInModal closeModal={closeModal} onAuth={onAuth} typeModal={typeModal}/>}
    </header>
  );
};

export default Header;
