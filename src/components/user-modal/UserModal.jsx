import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../store/user/userContext';
import placeholder from '/src/assets/user-photo.svg'
import './style.scss';
import Avatar from '../helper/Avatar';
export const UserModal = ({ closeUserModal }) => {
  const navigate = useNavigate();
  const {user} = useUserContext();

  const onHandleClickWrap = (e) => e.target == e.currentTarget && closeUserModal();
  const onHandleBtnSetting = () => {
    navigate(`/settings`);
    closeUserModal();
  };
  return (
    <div className="user-modal-wrap" onClick={onHandleClickWrap}>
      <div className="user-modal" onClick={onHandleBtnSetting}>
        <div className="modal-header">
          <div className="user-avatar">
            {/* <img src={user?.avatar || placeholder} alt="" /> */}
            <Avatar uid={user.uid}/>
            </div>
          <div className="user-name">{user.name}</div>
        </div>
        <div className="modal-content">

          <div className="content-item" >
            <svg height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8" r="4" fill="#FFFFFF" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="#FFFFFF" />
            </svg>
            <span>Настройки</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
