import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../../store/user/userContext';
import LogInModal from '../modal/LogInModal';
import placeholder from '/src/assets/user-photo.svg'
import './style.scss';
import Button from '../uix/Button';

const RightMenu = ({isOpenSandwich, onCloseSandwich}) => {
  const { isLogin, user,  onCreateUser, onSignOut, onSignUser } = useUserContext();
  const [isOpenModal, setIsopenModal] = useState(false);
  const [typeModal, setTypeModal] = useState(null);

  const onAuth = async (email, password) => {
    const success =
      typeModal === 'regist'
        ? await onCreateUser(email, password)
        : await onSignUser(email, password);
    if (success.ok) closeModal();
    return success.code;
  };
  const closeModal = () => {
    setIsopenModal(false);
  };

  const handleBtnSignIn = () => {
    setIsopenModal(true);
    setTypeModal('signIn');
    onCloseSandwich()
  };
  const handleBtnRegist = () => {
    setIsopenModal(true);
    setTypeModal('regist');
    onCloseSandwich();
  };
  const onHandleBtnSignOut = () => {
    onSignOut();
    onCloseSandwich()
    navigate('/');
  };
  return (
    <div className={isOpenSandwich ? "left-menu open" : "left-menu"}>
      <div className="left-menu-search-block">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="7" stroke="#ffffff" strokeWidth="2" />
          <line
            x1="16.65"
            y1="16.65"
            x2="21"
            y2="21"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input type="text" placeholder="Поиск..." />
      </div>
      {isLogin && <div className="left-menu-profile">
        <img src={user?.avatar || placeholder} alt="" />
        <div className="user-name">{user?.name}</div>
      </div>}
      
      <nav className="left-menu-nav-list" onClick={onCloseSandwich}>
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
        {isLogin && (
        <NavLink className={(arg) => (arg.isActive ? 'active' : '')} to="/settings">
          Настройки
        </NavLink>)}
      </nav>
      {isLogin ? (
        <div className="btn-auth">
          <Button onClick={onHandleBtnSignOut} text="Выйти"/>
        </div>
      ) : (
        <div className="btn-auth">
          <Button onClick={handleBtnRegist} text="Регистрация"/>
          <Button onClick={handleBtnSignIn} text="Войти"/>
        </div>
      )}
      {isOpenModal && <LogInModal closeModal={closeModal} onAuth={onAuth} typeModal={typeModal} />}
    </div>
  );
};

export default RightMenu;
