import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from '../../store/store';
import Avatar from '../helper/Avatar';

import './style.scss';
const SearchModal = () => {
  const [value, setValue] = useState('');
  const [isOpenDropList, setIsOpenDropList] = useState(false);
  const [searchUserList, setSearchUserList] = useState([]);
  const allUsers = store.allUsers.map((item) => item.split('---'));
  const navigate = useNavigate();

  const onSearchUser = (e) => {
    if(e.target.value.trim() !== ''){
      const newSearchList = allUsers.filter((item) => item[0].includes(e.target.value));
      setSearchUserList(newSearchList)
      setIsOpenDropList(true);
    }else{
      setIsOpenDropList(false);
    }
    setValue(e.target.value);
  };
  const handleNavigate = (uid) =>{
    navigate('posts/' + uid);
    setValue('');
    setIsOpenDropList(false);
  }
  const classList = isOpenDropList ? "search-user-list open" : "search-user-list";
  return (
    <div className="search-block">
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
      <input type="text" placeholder="Поиск..." value={value} onChange={onSearchUser} />
      <div className={classList}>
        {searchUserList.length > 0 &&
          searchUserList.map((item) => (
            <div className="search-user-item" key={item[1]} onClick={() => handleNavigate(item[1])}>
              <Avatar className="search-user-avatar" uid={item[1]}/>
              <div className="search-user-name">{item[0]}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchModal;
