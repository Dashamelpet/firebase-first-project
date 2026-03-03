import { useMemo, useState } from 'react';
import { getTextErrorModal } from '../../firebase/helper.api';
import Button from '../uix/Button';

import './style.scss';

export default function LogInModal({ closeModal, onAuth, typeModal }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [codeError, setCodeError] = useState(null);


  const memoisRegist = useMemo(() => typeModal === 'regist', [typeModal])

  const isNotEmptyInputs = () =>{
    if(login.trim() === '' || password.trim() === '') return false;
    return true
  }
  // const isRegist =;
  const onHandleClickLogIn = async () => {
    // validation
    if(isNotEmptyInputs()){
      const code = await onAuth(login, password);
      code && setCodeError(getTextErrorModal(code))
    }else setCodeError(getTextErrorModal('inputs-is-empty'))
  };

  const resetError = () => {
    setCodeError(null)
  };

  const onHandleClickWrap = (e) => {
    e.target == e.currentTarget && closeModal();
  };
  return (
    <div className="modal-wrap" onClick={onHandleClickWrap}>
      <div className="modal">
        {memoisRegist ? <h2 className='modal-title'>Регистрация</h2> : <h2 className='modal-title'>Вход</h2>}
        <input
          type="email"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          onFocus={resetError}
          placeholder='Email'

        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={resetError}
          placeholder='Password'
        />
        <p className="error-text">{codeError}</p>
        <Button 
          onClick={onHandleClickLogIn} 
          text={memoisRegist ? 'Зарегистрироваться' : "Войти"}/>
      </div>
    </div>
  );
}
