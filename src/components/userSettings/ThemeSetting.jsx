import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setColorBtnBg, setColorText } from '../../redux/user/setting.provide';
import Button from '../uix/Button';

const ThemeSetting = () => {
  const { textColor, btnBg } = useSelector((store) => store.themeStore);
  const dispatch = useDispatch();
  const [text, setText] = useState(textColor);
  const [background, setBackground] = useState(btnBg);

  console.log(textColor, btnBg )

  const onChangeColors = () => {
    dispatch(setColorText(text));
    dispatch(setColorBtnBg(background));
  };

  return (
    <div className="theme-setting">
      <h2>Change colors</h2>
      <div className="inputs-block">
        <div>
          <span>Выберите цвет текста</span>
          <input type="color" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div>
          <span>Выберите цвет кнопок</span>
          <input type="color" value={background} onChange={(e) => setBackground(e.target.value)} />
        </div>
        <Button onClick={onChangeColors} text={'Изменить'} />
      </div>
    </div>
  );
};

export default ThemeSetting;
