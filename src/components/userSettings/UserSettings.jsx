import { useState } from 'react';
import './style.scss'
import { useUserContext } from '../../store/user/userContext';
import { useEffect } from 'react';
import { getAvatarURL_IMG } from '../../firebase/apiImg';
import AutorisationHOC from '../../HOC/AutorisationHOC';
import Avatar from '../helper/Avatar';
import placeholder from '/src/assets/user-photo.svg'
import Button from '../uix/Button';
const imgTest = {
  url: '/src/assets/user-photo.svg',
  file: null
}

const UserSettings = () => {
  const {user, updateNameUser, updateFullDataUser} = useUserContext();
  const [img,setImg] = useState(imgTest);
  const [skipPhotoUpload, setSkipPhotoUpload] = useState(true);
  const [userName,setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() =>{
    setImg({
      url: user.avatar || '/src/assets/user-photo.svg',
      file:null});
    setUserName(user.name || '');
    setUserEmail(user.email || '');
  }, [])

  const changePhotoUrl = (e) =>{
    const file = (e.target.files[0]);
    const previewUrl = URL.createObjectURL(file);
    setImg({url:previewUrl, file: file});
    setSkipPhotoUpload(false);
  }
  const removePhotoUrl = () => {
    setImg({
      url: '/src/assets/user-photo.svg',
      file: null
    })
    setSkipPhotoUpload(false)
    }
  
  const changeDataUser = async() =>{
    skipPhotoUpload 
      ? await updateNameUser({ userName, uid:user.uid,})
      : await updateFullDataUser(
        { 
          userName, 
          photoFile: img.file, 
          uid:user.uid, 
        });
  }

  return (
    <div>
      <h2 className='page-title'>Settings</h2>
      <div className="setting-wrapper">
        <div className="setting-img-block">
            <div className='setting-img'>
              <img src={img.url || placeholder} alt="" />
              </div>
            <label>Изменить<input type="file" className="file-input" onChange={changePhotoUrl} accept="image/*"/></label>
            <Button onClick={removePhotoUrl} text="Удалить"/>
        </div>
        <div className="setting-content">
        <div className='input-wrap'><span> Ваше Имя</span>
            <input type="text"  placeholder={userName || 'Введите ваше имя'} value={userName} onChange={(e) => setUserName(e.target.value)}/></div>
        <div className='input-wrap' ><span>Ваш Email</span> 
            <input type="email"  placeholder={userEmail || 'Введите ваш email'} value={userEmail}  readOnly/></div>
        <Button onClick={changeDataUser} text="Сохранить"/>
        </div>
        
      </div>
    </div>
  )
}

export default AutorisationHOC(UserSettings)
