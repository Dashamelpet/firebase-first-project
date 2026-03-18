import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setColor} from '../../redux/user/setting.provide';
import Button from '../uix/Button';

const ThemeSetting = () => {
  // const { textColor, btnBg } = useSelector((store) => store.themeStore.color);
  const colorR = useSelector((store) => store.themeStore.color);
  const dispatch = useDispatch();

  // const [text, setText] = useState(textColor);
  // const [background, setBackground] = useState(btnBg);

  const [colorLocal, setColorLocal] = useState(colorR);

  const onChangeColors = () => {
    // dispatch(setColor({textColor:text, btnBg:background}))
    // dispatch(setColor({textColor:colorLocal.textColor, btnBg: colorLocal.btnBg}))
    dispatch(setColor(colorLocal))
  };
  const onResetColors = () => {
    dispatch(setColor({textColor:'#ffffff', btnBg:'#7B6AA8'}))
    setColorLocal({textColor:'#ffffff', btnBg:'#7B6AA8'});
    // setBackground('#7B6AA8');
  };
  const changeColorLocal = (event) => {
    const {value, name} = event.target;
    setColorLocal(prev => ({...prev, [name]: value} ))
  }

  return (
    <div className="theme-setting">
      <h2>Change colors</h2>
      <div className="inputs-block">
        <div>
          <span>Выберите цвет текста</span>
          <input type="color" name="textColor" value={colorLocal.textColor} onChange={changeColorLocal} />
        </div>
        <div>
          <span>Выберите цвет кнопок</span>
          <input type="color" name="btnBg" value={colorLocal.btnBg} onChange={changeColorLocal} />
        </div>
        <Button onClick={onChangeColors} text={'Изменить'} />
        <Button onClick={onResetColors} text={'Сброс'} />
      </div>
    </div>
  );
};

export default ThemeSetting;
