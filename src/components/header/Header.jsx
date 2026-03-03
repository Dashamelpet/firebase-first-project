import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getTextErrorModal } from '../../firebase/helper.api';
import { useUserContext } from '../../store/user/userContext';
import LogInModal from '../modal/LogInModal';
import UserModal from '../user-modal/UserModal';
import placeholder from '/src/assets/user-photo.svg';
import './style.scss';
import Avatar from '../helper/Avatar';
import SearchModal from '../searchModal/SearchModal';
import RightMenu from '../rightMenu/RightMenu';

const buttons = {
  login: { type: 'login', text: 'Войти' },
  regist: { type: 'registation', text: 'Регистрация' },
};

const Header = () => {
  const { user } = useUserContext();
  const [isOpenModal, setIsopenModal] = useState(false);
  const [typeModal, setTypeModal] = useState(null);
  const { isLogin, onCreateUser, onSignOut, onSignUser } = useUserContext();
  const [isOpenUserModal, setOpenUserModal] = useState(false);
  const [isOpenSandwich, setIsOpenSandwich] = useState(false);

  const navigate = useNavigate();
  const closeModal = () => {
    setIsopenModal(false);
  };

  const handleBtnSignIn = () => {
    setIsopenModal(true);
    setTypeModal('signIn');
  };
  const handleBtnRegist = () => {
    setIsopenModal(true);
    setTypeModal('regist');
  };

  const openUserModal = () => setOpenUserModal(true);
  const closeUserModal = () => setOpenUserModal(false);
  const onAuth = async (email, password) => {
    const success =
      typeModal === 'regist'
        ? await onCreateUser(email, password)
        : await onSignUser(email, password);
    if (success.ok) closeModal();
    return success.code;
  };
  const onHandleBtnSignOut = () => {
    onSignOut();
    navigate('/');
  };
  //!!!
  const onCloseSandwich = () => setIsOpenSandwich(false);
  const onHandleSandwichClick = () => {
    setIsOpenSandwich(!isOpenSandwich);
  };

  return (
    <header>
      <div className="logo"></div>
      <nav className="nav-list">
        {/* <NavLink className={(arg) => (arg.isActive ? 'active logo' : ' logo')} to="/"> */}
        {/* <img src="/src/assets/logo.svg" alt="" /> */}
        {/* </NavLink> */}
        <NavLink className={(arg) => (arg.isActive ? 'active' : '')} to="/">
          Главная
        </NavLink>
        {/* <NavLink className={(arg) => (arg.isActive ? 'active' : '')} to="/allPosts">
          Лента
        </NavLink> */}
        {isLogin && (
          <NavLink className={(arg) => (arg.isActive ? 'active' : '')} to="/createPost">
            Новый пост
          </NavLink>
        )}
        {isLogin && (
          <NavLink className={(arg) => (arg.isActive ? 'active' : '')} to={'/posts/' + user.uid}>
            Моя лента
          </NavLink>
        )}
      </nav>
      <SearchModal />
      {isLogin ? (
        <div className="btn-auth">
          <button onClick={onHandleBtnSignOut}>Выйти</button>
          <div className="profile" onClick={openUserModal}>
            <img src={user?.avatar || placeholder} alt="" />
            {/* <Avatar uid={user.uid}/> */}
          </div>
          {isOpenUserModal && <UserModal closeUserModal={closeUserModal} />}
        </div>
      ) : (
        <div className="btn-auth">
          <button onClick={handleBtnRegist}>Регистрация</button>
          <button onClick={handleBtnSignIn}>Войти</button>
        </div>
      )}
      <div
        className={isOpenSandwich ? 'sandwich open' : 'sandwich'}
        onClick={onHandleSandwichClick}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {<RightMenu isOpenSandwich={isOpenSandwich} onCloseSandwich={onCloseSandwich} />}
      {isOpenModal && <LogInModal closeModal={closeModal} onAuth={onAuth} typeModal={typeModal} />}
    </header>
  );
};

export default Header;
