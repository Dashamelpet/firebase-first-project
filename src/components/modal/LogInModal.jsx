import { useState } from 'react';
import { createUserAuth } from '../../firebase/auth';
import { useUserContext } from '../../store/context';

import './style.scss'

export default function LogInModal() {
  const {changeUser, closeModal } = useUserContext();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const onHandleClickLogIn = async () => {
    const response = await createUserAuth(login, password);
    changeUser(response.user.email);
    closeModal();
  };
  const onHandleClickWrap =(e) =>{
    e.target == e.currentTarget && closeModal()
  }
  return (
    <div className="modal-wrap" onClick={onHandleClickWrap}>
      <div className='modal'>
        <h2>LogIn</h2>
        <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button onClick={onHandleClickLogIn}>Вход</button>
      </div>
    </div>
  );
}
