import { useMemo, useState } from 'react';
import { getTextErrorModal } from '../../firebase/helper.api';

import './style.scss';

export default function LogInModal({ closeModal, onAuth, typeModal }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [codeError, setCodeError] = useState(null);


  const memoisRegist = useMemo(() => typeModal === 'regist', [typeModal])


  // const isRegist =;
  const onHandleClickLogIn = async () => {
    // validation
    const code = await onAuth(login, password);
    code && setCodeError(getTextErrorModal(code))
  };

  const resetError = () => {
    setCodeError(null)
  };

  // const errorText = useMemo(() => {
  //   return getTextErrorModal(codeError)
  // }, [codeError]);

  const onHandleClickWrap = (e) => {
    e.target == e.currentTarget && closeModal();
  };
  return (
    <div className="modal-wrap" onClick={onHandleClickWrap}>
      <div className="modal">
        {memoisRegist ? <h2>Регистрация</h2> : <h2>Вход</h2>}
        <input
          type="email"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          onFocus={resetError}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={resetError}
        />
        <p className="error-text">{codeError}</p>
        {memoisRegist ? (
          <button onClick={onHandleClickLogIn}>Зарегистрироваться</button>
        ) : (
          <button onClick={onHandleClickLogIn}>Войти</button>
        )}
      </div>
    </div>
  );
}
